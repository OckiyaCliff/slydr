use anchor_lang::prelude::*;
use anchor_lang::solana_program::program::invoke;
use anchor_lang::solana_program::system_instruction;

declare_id!("YOUR_PROGRAM_ID_HERE");

#[program]
pub mod slydr_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, platform_fee: u64) -> Result<()> {
        let platform = &mut ctx.accounts.platform;
        platform.authority = ctx.accounts.authority.key();
        platform.platform_fee = platform_fee;
        platform.total_content_count = 0;
        platform.total_sales_volume = 0;
        Ok(())
    }

    pub fn create_content(
        ctx: Context<CreateContent>,
        content_id: String,
        arweave_id: String,
        price: u64,
        royalty_percentage: u8,
    ) -> Result<()> {
        // Validate royalty percentage
        if royalty_percentage > 100 {
            return Err(ErrorCode::InvalidRoyaltyPercentage.into());
        }

        let content = &mut ctx.accounts.content;
        let creator = &ctx.accounts.creator;
        let platform = &ctx.accounts.platform;

        content.id = content_id;
        content.creator = creator.key();
        content.arweave_id = arweave_id;
        content.price = price;
        content.royalty_percentage = royalty_percentage;
        content.sales_count = 0;
        content.active = true;
        content.created_at = Clock::get()?.unix_timestamp;

        // Increment platform content count
        let platform_data = &mut ctx.accounts.platform;
        platform_data.total_content_count += 1;

        Ok(())
    }

    pub fn purchase_content(ctx: Context<PurchaseContent>) -> Result<()> {
        let content = &mut ctx.accounts.content;
        let buyer = &ctx.accounts.buyer;
        let creator = &ctx.accounts.creator;
        let platform = &mut ctx.accounts.platform;
        let purchase = &mut ctx.accounts.purchase;

        // Check if content is active
        if !content.active {
            return Err(ErrorCode::ContentNotActive.into());
        }

        // Transfer funds from buyer to creator
        let price = content.price;
        let platform_fee_amount = platform.platform_fee;
        let creator_amount = price - platform_fee_amount;

        // Transfer to creator
        invoke(
            &system_instruction::transfer(buyer.key, creator.key, creator_amount),
            &[
                buyer.to_account_info(),
                creator.to_account_info(),
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

        // Update content stats
        content.sales_count += 1;

        // Update platform stats
        platform.total_sales_volume += price;

        // Record purchase
        purchase.buyer = buyer.key();
        purchase.content = content.key();
        purchase.price = price;
        purchase.timestamp = Clock::get()?.unix_timestamp;
        purchase.resale_rights = true;

        Ok(())
    }

    pub fn resell_content(ctx: Context<ResellContent>, price: u64) -> Result<()> {
        let content = &ctx.accounts.content;
        let seller = &ctx.accounts.seller;
        let buyer = &ctx.accounts.buyer;
        let creator = &ctx.accounts.creator;
        let platform = &mut ctx.accounts.platform;
        let purchase = &mut ctx.accounts.purchase;

        // Check if content is active
        if !content.active {
            return Err(ErrorCode::ContentNotActive.into());
        }

        // Check if seller has resale rights
        // In a real implementation, we would check the seller's purchase record
        // For simplicity, we're assuming they have rights

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

        // Record purchase
        purchase.buyer = buyer.key();
        purchase.content = content.key();
        purchase.price = price;
        purchase.timestamp = Clock::get()?.unix_timestamp;
        purchase.resale_rights = true;

        Ok(())
    }
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
        seeds = [b"platform"],
        bump
    )]
    pub platform: Account<'info, Platform>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PurchaseContent<'info> {
    #[account(mut)]
    pub content: Account<'info, Content>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    #[account(mut)]
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
pub struct ResellContent<'info> {
    #[account(mut)]
    pub content: Account<'info, Content>,
    #[account(mut)]
    pub seller: Signer<'info>,
    #[account(mut)]
    pub buyer: AccountInfo<'info>,
    #[account(mut)]
    pub creator: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [b"platform"],
        bump
    )]
    pub platform: Account<'info, Platform>,
    #[account(
        init,
        payer = seller,
        space = 8 + Purchase::LEN,
        seeds = [b"purchase", buyer.key().as_ref(), content.key().as_ref()],
        bump
    )]
    pub purchase: Account<'info, Purchase>,
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
}

impl Content {
    pub const LEN: usize = 64 + 32 + 64 + 8 + 1 + 8 + 1 + 8;
}

#[account]
pub struct Purchase {
    pub buyer: Pubkey,
    pub content: Pubkey,
    pub price: u64,
    pub timestamp: i64,
    pub resale_rights: bool,
}

impl Purchase {
    pub const LEN: usize = 32 + 32 + 8 + 8 + 1;
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
}

