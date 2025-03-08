import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Upload, DollarSign, Users, Share2, ShoppingCart, Wallet, BarChart } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function LearnMorePage() {
  return (
    <div className="container py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">How Slydr Works</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Slydr is a decentralized marketplace where creators can sell content with resale rights, and fans can earn by
          promoting and reselling that content.
        </p>
      </section>

      {/* For Creators Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">For Creators</div>
          <h2 className="text-3xl font-bold">Monetize your content in a new way</h2>
          <p className="text-lg text-muted-foreground">
            Slydr allows creators to sell their content with resale rights, creating a network of promoters who are
            incentivized to help you reach a wider audience.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Upload your content</h3>
                <p className="text-muted-foreground">Upload your digital content to Slydr's decentralized storage.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Set your price and terms</h3>
                <p className="text-muted-foreground">Define your price, reseller commission, and other terms.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Grow your audience</h3>
                <p className="text-muted-foreground">
                  As fans promote and resell your content, your audience grows organically.
                </p>
              </div>
            </div>
          </div>

          <Button asChild size="lg">
            <Link href="/dashboard/create">
              Start Creating <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="bg-muted rounded-xl p-6 h-[400px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">[Creator Dashboard Illustration]</div>
        </div>
      </section>

      {/* For Fans Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1 bg-muted rounded-xl p-6 h-[400px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">[Fan Promotion Illustration]</div>
        </div>

        <div className="order-1 md:order-2 space-y-6">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">For Fans</div>
          <h2 className="text-3xl font-bold">Earn by promoting content you love</h2>
          <p className="text-lg text-muted-foreground">
            As a fan, you can purchase content with resale rights and earn commissions by promoting and reselling it to
            others.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Buy content with resale rights</h3>
                <p className="text-muted-foreground">
                  Purchase content from your favorite creators that includes resale rights.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Share and promote</h3>
                <p className="text-muted-foreground">
                  Share your unique link with friends, followers, and your network.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg">Earn commissions</h3>
                <p className="text-muted-foreground">Earn a commission every time someone buys through your link.</p>
              </div>
            </div>
          </div>

          <Button asChild size="lg">
            <Link href="/marketplace">
              Explore Marketplace <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">The Slydr Process</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform uses blockchain technology to ensure transparent, secure transactions and to track resale
            rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-6 text-left space-y-4 border">
            <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">1. Content Creation</h3>
            <p className="text-muted-foreground">
              Creators upload their content to Arweave, a decentralized storage solution, and set their terms.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 text-left space-y-4 border">
            <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">2. Purchase & Resale Rights</h3>
            <p className="text-muted-foreground">
              Fans purchase content and automatically receive resale rights through a smart contract.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 text-left space-y-4 border">
            <div className="bg-primary/10 p-3 rounded-full h-12 w-12 flex items-center justify-center">
              <BarChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium">3. Promotion & Earnings</h3>
            <p className="text-muted-foreground">
              Fans promote content, and when others buy through their link, commissions are automatically distributed.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have questions about how Slydr works? Find answers to common questions below.
          </p>
        </div>

        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I get started as a creator?</AccordionTrigger>
            <AccordionContent>
              To get started as a creator, connect your wallet, complete the onboarding process, and then navigate to
              your dashboard where you can create and upload your first piece of content. You'll be able to set your
              price, commission rates, and other terms.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What types of content can I sell on Slydr?</AccordionTrigger>
            <AccordionContent>
              Slydr supports various types of digital content including music, art, videos, podcasts, writing, and more.
              As long as you own the rights to the content and it complies with our terms of service, you can sell it on
              our platform.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>How do commissions work?</AccordionTrigger>
            <AccordionContent>
              When you sell content on Slydr, you set a commission rate that resellers will earn. For example, if you
              set a 20% commission on a $10 item, resellers will earn $2 for each sale they generate, while you receive
              $8. These transactions are handled automatically through smart contracts.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How do I track my earnings?</AccordionTrigger>
            <AccordionContent>
              Both creators and resellers can track their earnings in real-time through their dashboard. You'll see
              detailed analytics on sales, commissions, and performance of your content or promotion efforts.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>What blockchain does Slydr use?</AccordionTrigger>
            <AccordionContent>
              Slydr uses the Solana blockchain for transactions due to its low fees and high speed. Content is stored on
              Arweave, a permanent decentralized storage solution, ensuring your content remains accessible.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 rounded-xl p-8 md:p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to get started?</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Join Slydr today and be part of the future of content creation and distribution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/dashboard/create">Start Creating</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/marketplace">Explore Marketplace</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

