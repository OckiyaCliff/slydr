import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

export default function GettingStartedGuide() {
  return (
    <div className="container py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-2">
          <Link href="/guides">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-6 mx-2" />
        <div className="text-sm text-muted-foreground">Getting Started</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-6">Getting Started with Slydr</h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="lead">
              Welcome to Slydr! This guide will walk you through everything you need to know to get started with our
              platform, from setting up your account to navigating the marketplace.
            </p>

            <div className="my-8 aspect-video relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Slydr Platform Overview"
                fill
                className="object-cover"
              />
            </div>

            <h2 id="what-is-slydr" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              What is Slydr?
            </h2>
            <p>
              Slydr is a revolutionary content marketplace built on the Solana blockchain that enables creators to
              monetize their content while allowing fans to earn by promoting content they love. Our unique resale
              rights model creates a win-win ecosystem for both creators and fans.
            </p>

            <h2 id="creating-account" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Creating Your Account
            </h2>
            <p>Getting started with Slydr is simple. Here's how to create your account:</p>

            <ol className="my-6 ml-6 list-decimal">
              <li className="mt-2">
                <strong>Connect your wallet</strong> - Click the "Connect Wallet" button in the top right corner of the
                page. We support Phantom, Solflare, and other Solana wallets.
              </li>
              <li className="mt-2">
                <strong>Complete your profile</strong> - After connecting your wallet, you'll be prompted to complete
                your profile. Add a username, profile picture, and bio to help others recognize you.
              </li>
              <li className="mt-2">
                <strong>Choose your role</strong> - Select whether you're primarily a creator, a fan, or both. This
                helps us customize your experience.
              </li>
              <li className="mt-2">
                <strong>Verify your email</strong> - Add and verify your email address to receive important
                notifications and recover your account if needed.
              </li>
            </ol>

            <div className="bg-muted p-6 rounded-lg my-8">
              <h3 className="text-xl font-medium mb-4">💡 Pro Tip</h3>
              <p className="mb-0">
                Make sure you've backed up your wallet's seed phrase in a secure location. This is the only way to
                recover your wallet if you lose access to your device.
              </p>
            </div>

            <h2 id="navigating-platform" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Navigating the Platform
            </h2>
            <p>
              Once your account is set up, you can start exploring Slydr. Here are the main sections of the platform:
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">Marketplace</h3>
            <p>
              The Marketplace is where you can discover and purchase content from creators. Browse by category, search
              for specific creators, or check out trending content.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-3">Dashboard</h3>
            <p>Your Dashboard is your personal control center. Here you can:</p>
            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">View your purchased content</li>
              <li className="mt-2">Track your earnings from resales</li>
              <li className="mt-2">Manage your created content (for creators)</li>
              <li className="mt-2">See your analytics and performance metrics</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">Profile</h3>
            <p>Your Profile page showcases your activity on Slydr. Other users can see your:</p>
            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">Created content (if you're a creator)</li>
              <li className="mt-2">Collection of purchased content</li>
              <li className="mt-2">Followers and following</li>
            </ul>

            <h2 id="making-first-purchase" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Making Your First Purchase
            </h2>
            <p>Ready to buy your first piece of content? Here's how:</p>

            <ol className="my-6 ml-6 list-decimal">
              <li className="mt-2">
                <strong>Find content you love</strong> - Browse the marketplace or search for specific creators or
                content types.
              </li>
              <li className="mt-2">
                <strong>Review the details</strong> - Check the content description, price, and resale terms.
              </li>
              <li className="mt-2">
                <strong>Complete the purchase</strong> - Click "Buy Now" and confirm the transaction in your wallet.
              </li>
              <li className="mt-2">
                <strong>Access your content</strong> - Once purchased, you can access the content from your dashboard or
                collection.
              </li>
            </ol>

            <div className="bg-muted p-6 rounded-lg my-8">
              <h3 className="text-xl font-medium mb-4">💡 Pro Tip</h3>
              <p className="mb-0">
                Make sure you have enough SOL in your wallet to cover both the purchase price and the transaction fees.
              </p>
            </div>

            <h2 id="reselling-content" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Reselling Content
            </h2>
            <p>
              One of Slydr's unique features is the ability to resell content you've purchased. Here's how it works:
            </p>

            <ol className="my-6 ml-6 list-decimal">
              <li className="mt-2">
                <strong>Find your purchased content</strong> - Go to your dashboard or collection.
              </li>
              <li className="mt-2">
                <strong>Share your unique link</strong> - Each piece of content you own has a unique referral link.
                Share this with others.
              </li>
              <li className="mt-2">
                <strong>Earn from sales</strong> - When someone purchases through your link, you earn a percentage of
                the sale.
              </li>
            </ol>

            <p>
              The exact percentage you earn is set by the original creator when they list their content. This creates a
              win-win situation where creators earn royalties on every resale, and fans earn for promoting content they
              love.
            </p>

            <h2 id="next-steps" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Next Steps
            </h2>
            <p>Now that you understand the basics, here are some next steps to make the most of Slydr:</p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <Link href="/guides/resale-rights" className="text-primary hover:underline">
                  Learn more about resale rights
                </Link>{" "}
                and how to maximize your earnings
              </li>
              <li className="mt-2">
                <Link href="/guides/solana-basics" className="text-primary hover:underline">
                  Understand the Solana blockchain
                </Link>{" "}
                that powers Slydr
              </li>
              <li className="mt-2">
                If you're a creator, check out our
                <Link href="/guides/creator-guide" className="text-primary hover:underline ml-1">
                  Complete Creator Guide
                </Link>
              </li>
              <li className="mt-2">
                Join our
                <Link href="/community" className="text-primary hover:underline ml-1">
                  community
                </Link>{" "}
                to connect with other users and stay updated
              </li>
            </ul>

            <div className="mt-12 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Was this guide helpful?</h2>
              <div className="flex gap-4">
                <Button variant="outline">Yes, it helped!</Button>
                <Button variant="outline">I still have questions</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="sticky top-20">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">In this guide</h3>
                <nav className="space-y-1">
                  <a href="#what-is-slydr" className="block py-2 text-sm hover:text-primary">
                    What is Slydr?
                  </a>
                  <a href="#creating-account" className="block py-2 text-sm hover:text-primary">
                    Creating Your Account
                  </a>
                  <a href="#navigating-platform" className="block py-2 text-sm hover:text-primary">
                    Navigating the Platform
                  </a>
                  <a href="#making-first-purchase" className="block py-2 text-sm hover:text-primary">
                    Making Your First Purchase
                  </a>
                  <a href="#reselling-content" className="block py-2 text-sm hover:text-primary">
                    Reselling Content
                  </a>
                  <a href="#next-steps" className="block py-2 text-sm hover:text-primary">
                    Next Steps
                  </a>
                </nav>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Related Guides</h3>
                <div className="space-y-4">
                  <Link href="/guides/resale-rights" className="block text-sm hover:text-primary">
                    Understanding Resale Rights
                  </Link>
                  <Link href="/guides/solana-basics" className="block text-sm hover:text-primary">
                    Solana Blockchain Basics
                  </Link>
                  <Link href="/guides/creator-guide" className="block text-sm hover:text-primary">
                    Complete Creator Guide
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Ready to dive in?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your wallet and start exploring the Slydr marketplace.
                </p>
                <Button className="w-full">Connect Wallet</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Recommended Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Complete Your Profile</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add a profile picture, bio, and social links to make your profile stand out.
              </p>
              <Button variant="outline" className="w-full">
                Update Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Explore the Marketplace</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discover trending content and popular creators in the Slydr marketplace.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/marketplace">Browse Marketplace</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <CheckCircle2 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Read More Guides</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Check out our other guides to learn more about Slydr's features.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/guides">View All Guides</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

