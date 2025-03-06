use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction;

declare_id!("YOUR_PROGRAM_ID_HERE");

#[program]
pub mod slydr_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, platform_fee: u64) -> Result<()> {
        // Input validation
        require!(platform_fee > 0, ErrorCode::InvalidFeeAmount);

        let platform = &mut ctx.accounts.platform;
        platform.authority = ctx.accounts.authority.key();
        platform.platform_fee = platform_fee;
        platform.total_content_count = 0;
        platform.total_sales_volume = 0;

        // Emit event
        emit!(PlatformInitialized {
            authority: ctx.accounts.authority.key(),
            platform_fee,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn create_content(
        ctx: Context<CreateContent>,
        content_id: String,
        arweave_id: String,
        price: u64,
        royalty_percentage: u8,
        rental_enabled: bool,
        rental_price: u64,
        rental_duration: i64,
        subscription_tier: u8,
    ) -> Result<()> {
        // Input validation
        require!(!content_id.is_empty(), ErrorCode::InvalidContentId);
        require!(!arweave_id.is_empty(), ErrorCode::InvalidArweaveId);
        require!(price > 0, ErrorCode::InvalidPrice);
        require!(royalty_percentage <= 100, ErrorCode::InvalidRoyaltyPercentage);
        
        // If rental is enabled, validate rental parameters
        if rental_enabled {
            require!(rental_price > 0, ErrorCode::InvalidRentalPrice);
            require!(rental_duration > 0, ErrorCode::InvalidRentalDuration);
        }

        let content = &mut ctx.accounts.content;
        let creator = &ctx.accounts.creator;

        content.id = content_id.clone();
        content.creator = creator.key();
        content.arweave_id = arweave_id;
        content.price = price;
        content.royalty_percentage = royalty_percentage;
        content.sales_count = 0;
        content.active = true;
        content.created_at = Clock::get()?.unix_timestamp;
        
        // New fields
        content.rental_enabled = rental_enabled;
        content.rental_price = rental_price;
        content.rental_duration = rental_duration;
        content.subscription_tier = subscription_tier;

        // Increment platform content count
        let platform_data = &mut ctx.accounts.platform;
        platform_data.total_content_count += 1;

        // Emit event
        emit!(ContentCreated {
            content_id,
            creator: creator.key(),
            price,
            royalty_percentage,
            rental_enabled,
            subscription_tier,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn update_content(
        ctx: Context<UpdateContent>,
        price: Option<u64>,
        active: Option<bool>,
        rental_enabled: Option<bool>,
        rental_price: Option<u64>,
        rental_duration: Option<i64>,
        subscription_tier: Option<u8>,
    ) -> Result<()> {
        let content = &mut ctx.accounts.content;
        
        // Only update fields that are provided
        if let Some(new_price) = price {
            require!(new_price > 0, ErrorCode::InvalidPrice);
            content.price = new_price;
        }
        
        if let Some(new_active) = active {
            content.active = new_active;
        }
        
        if let Some(new_rental_enabled) = rental_enabled {
            content.rental_enabled = new_rental_enabled;
        }
        
        if let Some(new_rental_price) = rental_price {
            require!(new_rental_price > 0, ErrorCode::InvalidRentalPrice);
            content.rental_price = new_rental_price;
        }
        
        if let Some(new_rental_duration) = rental_duration {
            require!(new_rental_duration > 0, ErrorCode::InvalidRentalDuration);
            content.rental_duration = new_rental_duration;
        }
        
        if let Some(new_subscription_tier) = subscription_tier {
            content.subscription_tier = new_subscription_tier;
        }

        // Emit event
        emit!(ContentUpdated {
            content_id: content.id.clone(),
            creator: content.creator,
            price: content.price,
            active: content.active,
            rental_enabled: content.rental_enabled,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn purchase_content(ctx: Context<PurchaseContent>) -> Result<()> {
        let content = &mut ctx.accounts.content;
        let buyer = &ctx.accounts.buyer;
        let creator = &ctx.accounts.creator;
        let platform = &mut ctx.accounts.platform;
        let purchase = &mut ctx.accounts.purchase;

        // Check if content is active
        require!(content.active, ErrorCode::ContentNotActive);

        // Transfer funds using helper function
        transfer_funds(
            buyer.to_account_info(),
            creator.to_account_info(),
            platform.to_account_info(),
            content.price,
            platform.platform_fee,
            &[
                buyer.to_account_info(),
                creator.to_account_info(),
                platform.to_account_info(),
            ],
        )?;

        // Update content stats
        content.sales_count += 1;

        // Update platform stats
        platform.total_sales_volume += content.price;

        // Record purchase
        purchase.buyer = buyer.key();
        purchase.content = content.key();
        purchase.price = content.price;
        purchase.timestamp = Clock::get()?.unix_timestamp;
        purchase.resale_rights = true;
        purchase.purchase_type = PurchaseType::FullPurchase;
        purchase.expiration = None;

        // Emit event
        emit!(ContentPurchased {
            content_id: content.id.clone(),
            buyer: buyer.key(),
            creator: creator.key(),
            price: content.price,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }

    pub fn rent_content(ctx: Context<RentContent>) -> Result<()> {
        let content = &mut ctx.accounts.content;
        let renter = &ctx.accounts.renter;
        let creator = &ctx.accounts.creator;
        let platform = &mut ctx.accounts.platform;
        let rental = &mut ctx.accounts.rental;

        // Check if content is active and rental is enabled
        require!(content.active, ErrorCode::ContentNotActive);
        require!(content.rental_enabled, ErrorCode::RentalNotEnabled);

        // Transfer funds using helper function
        transfer_funds(
            renter.to_account_info(),
            creator.to_account_info(),
            platform.to_account_info(),
            content.rental_price,
            platform.platform_fee,
            &[
                renter.to_account_info(),
                creator.to_account_info(),
                platform.to_account_info(),
            ],
        )?;

        // Update platform stats
        platform.total_sales_volume += content.rental_price;

        // Calculate expiration time
        let current_time = Clock::get()?.unix_timestamp;
        let expiration_time = current_time + content.rental_duration;

        // Record rental
        rental.buyer = renter.key();
        rental.content = content.key();
        rental.price = content.rental_price;
        rental.timestamp = current_time;
        rental.resale_rights = false;
        rental.purchase_type = PurchaseType::Rental;
        rental.expiration = Some(expiration_time);

        // Emit event
        emit!(ContentRented {
            content_id: content.id.clone(),
            renter: renter.key(),
            creator: creator.key(),
            price: content.rental_price,
            expiration: expiration_time,
            timestamp: current_time,
        });

        Ok(())
    }

    pub fn subscribe(ctx: Context<Subscribe>, tier: u8) -> Result<()> {
        let subscriber = &ctx.accounts.subscriber;
        let platform = &mut ctx.accounts.platform;
        let subscription = &mut ctx.accounts.subscription;
        
        // Get subscription price based on tier
        let subscription_price = match tier {
            1 => 100_000_000, // 0.1 SOL for tier 1
            2 => 200_000_000, // 0.2 SOL for tier 2
            3 => 500_000_000, // 0.5 SOL for tier 3
            _ => return Err(ErrorCode::InvalidSubscriptionTier.into()),
        };
        
        // Transfer funds to platform
        invoke(
            &system_instruction::transfer(
                subscriber.key,
                platform.to_account_info().key,
                subscription_price,
            ),
            &[
                subscriber.to_account_info(),
                platform.to_account_info(),
            ],
        )?;
        
        // Calculate expiration (30 days from now)
        let current_time = Clock::get()?.unix_timestamp;
        let expiration_time = current_time + 30 * 24 * 60 * 60; // 30 days in seconds
        
        // Record subscription
        subscription.subscriber = subscriber.key();
        subscription.tier = tier;
        subscription.start_time = current_time;
        subscription.expiration_time = expiration_time;
        subscription.active = true;
        
        // Emit event
        emit!(SubscriptionCreated {
            subscriber: subscriber.key(),
            tier,
            price: subscription_price,
            expiration: expiration_time,
            timestamp: current_time,
        });
        
        Ok(())
    }

    pub fn resell_content(ctx: Context<ResellContent>, price: u64) -> Result<()> {
        let content = &ctx.accounts.content;
        let seller = &ctx.accounts.seller;
        let buyer = &ctx.accounts.buyer;
        let creator = &ctx.accounts.creator;
        let platform = &mut ctx.accounts.platform;
        let seller_purchase = &ctx.accounts.seller_purchase;
        let buyer_purchase = &mut ctx.accounts.buyer_purchase;

        // Check if content is active
        require!(content.active, ErrorCode::ContentNotActive);
        
        // Validate price
        require!(price > 0, ErrorCode::InvalidPrice);

        // Check if seller has resale rights
        require!(
            seller_purchase.resale_rights,
            ErrorCode::NoResaleRights
        );
        
        // Check if purchase is not expired (for rentals)
        if let Some(expiration) = seller_purchase.expiration {
            let current_time = Clock::get()?.unix_timestamp;
            require!(current_time < expiration, ErrorCode::PurchaseExpired);
        }

        // Calculate royalty amount
        let royalty_amount = (price * content.royalty_percentage as u64) / 100;
        let platform_fee_amount = platform.platform_fee;
        let seller_amount = price - royalty_amount - platform_fee_amount;

        // Transfer royalty to creator
        invoke(
            &system_instruction::transfer(buyer.key, creator.key, royalty_amount),
            &[
                buyer.to_account_info(),
                creator.to_account_info(),
            ],
        )?;

        // Transfer to seller
        invoke(
            &system_instruction::transfer(buyer.key, seller.key, seller_amount),
            &[
                buyer.to_account_info(),
                seller.to_account_info(),
            ],
        )?;

        // Transfer platform fee
        invoke(
            &system_instruction::transfer(buyer.key, platform.to_account_info().key, platform_fee_amount),
            &[
                buyer.to_account_info(),
                platform.to_account_info(),
            ],
        )?;

        // Update platform stats
        platform.total_sales_volume += price;

        // Record purchase for buyer
        buyer_purchase.buyer = buyer.key();
        buyer_purchase.content = content.key();
        buyer_purchase.price = price;
        buyer_purchase.timestamp = Clock::get()?.unix_timestamp;
        buyer_purchase.resale_rights = seller_purchase.resale_rights;
        buyer_purchase.purchase_type = seller_purchase.purchase_type;
        buyer_purchase.expiration = seller_purchase.expiration;

        // Emit event
        emit!(ContentResold {
            content_id: content.id.clone(),
            seller: seller.key(),
            buyer: buyer.key(),
            creator: creator.key(),
            price,
            royalty_amount,
            timestamp: Clock::get()?.unix_timestamp,
        });

        Ok(())
    }
}

// Helper function to transfer funds
fn transfer_funds(
    from: AccountInfo,
    to_creator: AccountInfo,
    to_platform: AccountInfo,
    amount: u64,
    platform_fee: u64,
    accounts: &[AccountInfo],
) -> Result<()> {
    // Calculate amounts
    let creator_amount = amount - platform_fee;
    
    // Transfer to creator
    invoke(
        &system_instruction::transfer(from.key, to_creator.key, creator_amount),
        accounts,
    )?;
    
    // Transfer platform fee
    invoke(
        &system_instruction::transfer(from.key, to_platform.key, platform_fee),
        accounts,
    )?;
    
    Ok(())
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Platform::LEN,
        seeds = [b"platform"],
        bump
    )]
    pub platform: Account<'info, Platform>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(content_id: String)]
pub struct CreateContent<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + Content::LEN,
        seeds = [b"content", content_id.as_bytes()],
        bump
    )]
    pub content: Account<'info, Content>,
    
    #[account(mut)]
    pub creator: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"platform"],
        bump
    )]
    pub platform: Account<'info, Platform>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateContent<'info> {
    #[account(
        mut,
        has_one = creator @ ErrorCode::NotAuthorized,
    )]
    pub content: Account<'info, Content>,
    
    #[account(mut)]
    pub creator: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PurchaseContent<'info> {
    #[account(mut)]
    pub content: Account<'info, Content>,
    
    #[account(mut)]
    pub buyer: Signer<'info>,
    
    #[account(
        mut,
        constraint = creator.key() == content.creator @ ErrorCode::NotAuthorized
    )]
    pub creator: AccountInfo<'info>,
    
    #[account(
        mut,
        seeds = [b"platform"],
        bump
    )]
    pub platform: Account<'info, Platform>,
    
    #[account(
        init,
        payer = buyer,
        space = 8 + Purchase::LEN,
        seeds = [b"purchase", buyer.key().as_ref(), content.key().as_ref()],
        bump
    )]
    pub purchase: Account<'info, Purchase>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RentContent<'info> {
    #[account(mut)]
    pub content: Account<'info, Content>,
    
    #[account(mut)]
    pub renter: Signer<'info>,
    
    #[account(
        mut,
        constraint = creator.key() == content.creator @ ErrorCode::NotAuthorized
    )]
    pub creator: AccountInfo<'info>,
    
    #[account(
        mut,
        seeds = [b"platform"],
        bump
    )]
    pub platform: Account<'info, Platform>,
    
    #[account(
        init,
        payer = renter,
        space = 8 + Purchase::LEN,
        seeds = [b"rental", renter.key().as_ref(), content.key().as_ref()],
        bump
    )]
    pub rental: Account<'info, Purchase>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Subscribe<'info> {
    #[account(mut)]
    pub subscriber: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"platform"],
        bump
    )]
    pub platform: Account<'info, Platform>,
    
    #[account(
        init,
        payer = subscriber,
        space = 8 + Subscription::LEN,
        seeds = [b"subscription", subscriber.key().as_ref()],
        bump
    )]
    pub subscription: Account<'info, Subscription>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ResellContent<'info> {
    #[account(mut)]
    pub content: Account<'info, Content>,
    
    #[account(mut)]
    pub seller: Signer<'info>,
    
    #[account(mut)]
    pub buyer: AccountInfo<'info>,
    
    #[account(
        mut,
        constraint = creator.key() == content.creator @ ErrorCode::NotAuthorized
    )]
    pub creator: AccountInfo<'info>,
    
    #[account(
        mut,
        seeds = [b"platform"],
        bump
    )]
    pub platform: Account<'info, Platform>,
    
    #[account(
        seeds = [b"purchase", seller.key().as_ref(), content.key().as_ref()],
        bump,
        constraint = seller_purchase.buyer == seller.key() @ ErrorCode::NotAuthorized,
        constraint = seller_purchase.content == content.key() @ ErrorCode::NotAuthorized,
    )]
    pub seller_purchase: Account<'info, Purchase>,
    
    #[account(
        init,
        payer = seller,
        space = 8 + Purchase::LEN,
        seeds = [b"purchase", buyer.key().as_ref(), content.key().as_ref()],
        bump
    )]
    pub buyer_purchase: Account<'info, Purchase>,
    
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Platform {
    pub authority: Pubkey,
    pub platform_fee: u64,
    pub total_content_count: u64,
    pub total_sales_volume: u64,
}

impl Platform {
    pub const LEN: usize = 32 + 8 + 8 + 8;
}

#[account]
pub struct Content {
    pub id: String,
    pub creator: Pubkey,
    pub arweave_id: String,
    pub price: u64,
    pub royalty_percentage: u8,
    pub sales_count: u64,
    pub active: bool,
    pub created_at: i64,
    // New fields
    pub rental_enabled: bool,
    pub rental_price: u64,
    pub rental_duration: i64,
    pub subscription_tier: u8,
}

impl Content {
    pub const LEN: usize = 64 + 32 + 64 + 8 + 1 + 8 + 1 + 8 + 1 + 8 + 8 + 1;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum PurchaseType {
    FullPurchase,
    Rental,
}

#[account]
pub struct Purchase {
    pub buyer: Pubkey,
    pub content: Pubkey,
    pub price: u64,
    pub timestamp: i64,
    pub resale_rights: bool,
    pub purchase_type: PurchaseType,
    pub expiration: Option<i64>,
}

impl Purchase {
    pub const LEN: usize = 32 + 32 + 8 + 8 + 1 + 1 + 9; // 9 for Option<i64>
}

#[account]
pub struct Subscription {
    pub subscriber: Pubkey,
    pub tier: u8,
    pub start_time: i64,
    pub expiration_time: i64,
    pub active: bool,
}

impl Subscription {
    pub const LEN: usize = 32 + 1 + 8 + 8 + 1;
}

#[event]
pub struct PlatformInitialized {
    pub authority: Pubkey,
    pub platform_fee: u64,
    pub timestamp: i64,
}

#[event]
pub struct ContentCreated {
    pub content_id: String,
    pub creator: Pubkey,
    pub price: u64,
    pub royalty_percentage: u8,
    pub rental_enabled: bool,
    pub subscription_tier: u8,
    pub timestamp: i64,
}

#[event]
pub struct ContentUpdated {
    pub content_id: String,
    pub creator: Pubkey,
    pub price: u64,
    pub active: bool,
    pub rental_enabled: bool,
    pub timestamp: i64,
}

#[event]
pub struct ContentPurchased {
    pub content_id: String,
    pub buyer: Pubkey,
    pub creator: Pubkey,
    pub price: u64,
    pub timestamp: i64,
}

#[event]
pub struct ContentRented {
    pub content_id: String,
    pub renter: Pubkey,
    pub creator: Pubkey,
    pub price: u64,
    pub expiration: i64,
    pub timestamp: i64,
}

#[event]
pub struct ContentResold {
    pub content_id: String,
    pub seller: Pubkey,
    pub buyer: Pubkey,
    pub creator: Pubkey,
    pub price: u64,
    pub royalty_amount: u64,
    pub timestamp: i64,
}

#[event]
pub struct SubscriptionCreated {
    pub subscriber: Pubkey,
    pub tier: u8,
    pub price: u64,
    pub expiration: i64,
    pub timestamp: i64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Royalty percentage must be between 0 and 100")]
    InvalidRoyaltyPercentage,
    #[msg("Insufficient funds to complete the purchase")]
    InsufficientFunds,
    #[msg("Not authorized to perform this action")]
    NotAuthorized,
    #[msg("Content is not active")]
    ContentNotActive,
    #[msg("No resale rights for this content")]
    NoResaleRights,
    #[msg("Content ID cannot be empty")]
    InvalidContentId,
    #[msg("Arweave ID cannot be empty")]
    InvalidArweaveId,
    #[msg("Price must be greater than 0")]
    InvalidPrice,
    #[msg("Platform fee must be greater than 0")]
    InvalidFeeAmount,
    #[msg("Rental is not enabled for this content")]
    RentalNotEnabled,
    #[msg("Rental price must be greater than 0")]
    InvalidRentalPrice,
    #[msg("Rental duration must be greater than 0")]
    InvalidRentalDuration,
    #[msg("Purchase has expired")]
    PurchaseExpired,
    #[msg("Invalid subscription tier")]
    InvalidSubscriptionTier,
}

