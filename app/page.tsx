import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Repeat, Coins } from "lucide-react"
import HeroSection from "@/components/hero-section"
import FeaturedCreators from "@/components/featured-creators"
import HowItWorks from "@/components/how-it-works"
import TrendingContent from "@/components/trending-content"

// Add imports for the new components
import HotTrending from "@/components/hot-trending"
import FaqSection from "@/components/faq-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container px-4 py-12 md:py-24 lg:py-32">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
            <span className="font-medium text-primary">Powered by Solana</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Discover Exclusive Content</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Browse unique digital creations with resale rights. Buy once, sell again, and earn from every transaction.
          </p>
        </div>
        <TrendingContent />
        <div className="flex justify-center mt-8">
          <Button asChild size="lg">
            <Link href="/marketplace">
              Explore Marketplace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <HotTrending />

      <HowItWorks />

      <FaqSection />

      <section className="container px-4 py-12 md:py-24 bg-muted/50">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Creators</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            Discover talented artists, musicians, and designers sharing their exclusive work on Slydr.
          </p>
        </div>
        <FeaturedCreators />
      </section>

      <section className="container px-4 py-12 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join the Slydr Community</h2>
            <p className="text-muted-foreground md:text-xl">
              Whether you're a creator looking to monetize your work or a fan wanting to support and profit from your
              favorite artists, Slydr offers a transparent, decentralized marketplace for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/signup?type=creator">Join as Creator</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/signup?type=fan">Join as Fan</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Exclusive Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Access unique digital creations not available elsewhere
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Repeat className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Resale Rights</h3>
                  <p className="text-sm text-muted-foreground">
                    Buy and resell content to earn profits on each transaction
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Royalty Distribution</h3>
                  <p className="text-sm text-muted-foreground">Transparent earnings for creators and resellers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

