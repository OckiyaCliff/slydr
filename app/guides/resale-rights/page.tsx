import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, DollarSign, BarChart3, Users, Repeat, PieChart } from "lucide-react"

export default function ResaleRightsGuide() {
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
        <div className="text-sm text-muted-foreground">Intermediate</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-6">Understanding Resale Rights</h1>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="lead">
              Resale rights are at the core of Slydr's innovative approach to content monetization. This guide explains
              how resale rights work, how they benefit both creators and fans, and how to maximize your earnings.
            </p>

            <div className="my-8 aspect-video relative rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=1200"
                alt="Resale Rights Diagram"
                fill
                className="object-cover"
              />
            </div>

            <h2 id="what-are-resale-rights" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              What Are Resale Rights?
            </h2>
            <p>
              Resale rights on Slydr give content purchasers the ability to resell the content they buy and earn a
              commission on each sale. Unlike traditional content platforms where only the original creator earns money,
              Slydr creates a collaborative economy where both creators and fans can profit.
            </p>

            <p>Here's how it works:</p>

            <ol className="my-6 ml-6 list-decimal">
              <li className="mt-2">
                <strong>Creator publishes content</strong> - A creator uploads their content and sets the initial price
                and resale commission rates.
              </li>
              <li className="mt-2">
                <strong>Fan purchases content</strong> - A fan buys the content at the listed price.
              </li>
              <li className="mt-2">
                <strong>Fan receives resale rights</strong> - The fan now has the right to promote and resell that
                content to others.
              </li>
              <li className="mt-2">
                <strong>Fan promotes content</strong> - The fan shares their unique referral link with their audience.
              </li>
              <li className="mt-2">
                <strong>New purchase occurs</strong> - Someone purchases the content through the fan's referral link.
              </li>
              <li className="mt-2">
                <strong>Revenue is distributed</strong> - The creator receives a royalty, the referring fan receives
                their commission, and the new buyer gets their own resale rights.
              </li>
            </ol>

            <h2 id="benefits-for-creators" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Benefits for Creators
            </h2>
            <p>Resale rights offer several advantages for content creators:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-muted p-6 rounded-lg flex flex-col">
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-xl font-medium mb-2">Ongoing Revenue</h3>
                <p className="text-sm mb-0">
                  Earn royalties on every resale, not just the initial sale, creating a sustainable income stream.
                </p>
              </div>

              <div className="bg-muted p-6 rounded-lg flex flex-col">
                <Users className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-xl font-medium mb-2">Wider Reach</h3>
                <p className="text-sm mb-0">
                  Your fans become your marketing team, helping your content reach audiences you might not otherwise
                  access.
                </p>
              </div>

              <div className="bg-muted p-6 rounded-lg flex flex-col">
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-xl font-medium mb-2">Market Insights</h3>
                <p className="text-sm mb-0">
                  Gain valuable data on how your content spreads and which fans are your best promoters.
                </p>
              </div>

              <div className="bg-muted p-6 rounded-lg flex flex-col">
                <Repeat className="h-8 w-8 text-primary mb-2" />
                <h3 className="text-xl font-medium mb-2">Community Building</h3>
                <p className="text-sm mb-0">
                  Create stronger relationships with fans who are now partners in your success.
                </p>
              </div>
            </div>

            <h2 id="benefits-for-fans" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Benefits for Fans
            </h2>
            <p>Fans also gain significant advantages from the resale rights model:</p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <strong>Earn from promotion</strong> - Get paid for sharing content you love with your network.
              </li>
              <li className="mt-2">
                <strong>Become a curator</strong> - Build a reputation as a trusted source for quality content.
              </li>
              <li className="mt-2">
                <strong>Support creators</strong> - Help your favorite creators succeed while also benefiting yourself.
              </li>
              <li className="mt-2">
                <strong>No inventory or fulfillment</strong> - Unlike traditional reselling, there's no need to manage
                inventory or handle shipping.
              </li>
            </ul>

            <h2 id="how-commissions-work" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              How Commissions Work
            </h2>
            <p>When a creator lists content on Slydr, they set two important parameters:</p>

            <ol className="my-6 ml-6 list-decimal">
              <li className="mt-2">
                <strong>Initial price</strong> - The amount a buyer pays for the content.
              </li>
              <li className="mt-2">
                <strong>Commission structure</strong> - How revenue is split on resales.
              </li>
            </ol>

            <p>The commission structure typically includes:</p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <strong>Creator royalty</strong> - The percentage the original creator receives from each resale
                (typically 10-50%).
              </li>
              <li className="mt-2">
                <strong>Referrer commission</strong> - The percentage the referring fan receives (typically 20-70%).
              </li>
              <li className="mt-2">
                <strong>Platform fee</strong> - Slydr's fee for facilitating the transaction (typically 5-10%).
              </li>
            </ul>

            <div className="my-8 p-6 border rounded-lg">
              <h3 className="text-xl font-medium mb-4">Example Commission Structure</h3>
              <div className="flex items-center justify-center mb-6">
                <PieChart className="h-48 w-48 text-primary" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">40%</div>
                  <div className="text-sm text-muted-foreground">Creator Royalty</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50%</div>
                  <div className="text-sm text-muted-foreground">Referrer Commission</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">10%</div>
                  <div className="text-sm text-muted-foreground">Platform Fee</div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-medium mt-6 mb-3">Example Scenario</h3>
            <p>Let's walk through an example to see how this works in practice:</p>

            <ol className="my-6 ml-6 list-decimal">
              <li className="mt-2">A musician uploads a new album and prices it at 50 SOL.</li>
              <li className="mt-2">
                They set a commission structure of 40% creator royalty, 50% referrer commission, and 10% platform fee.
              </li>
              <li className="mt-2">Fan A purchases the album for 50 SOL.</li>
              <li className="mt-2">Fan A shares their referral link with their followers.</li>
              <li className="mt-2">Fan B clicks the link and purchases the album for 50 SOL.</li>
              <li className="mt-2">
                The 50 SOL is distributed as follows:
                <ul className="ml-6 list-disc">
                  <li>20 SOL (40%) goes to the musician</li>
                  <li>25 SOL (50%) goes to Fan A</li>
                  <li>5 SOL (10%) goes to Slydr</li>
                </ul>
              </li>
              <li className="mt-2">Fan B now has their own referral link and can earn commissions by sharing it.</li>
            </ol>

            <div className="bg-muted p-6 rounded-lg my-8">
              <h3 className="text-xl font-medium mb-4">💡 Pro Tip</h3>
              <p className="mb-0">
                As a creator, finding the right balance in your commission structure is key. A higher referrer
                commission incentivizes more promotion, while a higher creator royalty maximizes your earnings per sale.
                Experiment to find what works best for your content and audience.
              </p>
            </div>

            <h2 id="strategies-for-creators" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Strategies for Creators
            </h2>
            <p>To maximize your earnings as a creator, consider these strategies:</p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <strong>Optimize your commission structure</strong> - Test different commission rates to find the sweet
                spot that encourages promotion while maintaining your earnings.
              </li>
              <li className="mt-2">
                <strong>Create tiered content</strong> - Offer different content at various price points to appeal to
                different segments of your audience.
              </li>
              <li className="mt-2">
                <strong>Identify and nurture top promoters</strong> - Build relationships with fans who consistently
                drive sales and consider offering them special incentives.
              </li>
              <li className="mt-2">
                <strong>Regularly release new content</strong> - Keep your audience engaged and give them new
                opportunities to earn.
              </li>
              <li className="mt-2">
                <strong>Educate your audience</strong> - Make sure your fans understand how they can earn by promoting
                your content.
              </li>
            </ul>

            <h2 id="strategies-for-fans" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Strategies for Fans
            </h2>
            <p>As a fan looking to maximize your earnings from resale rights, consider these approaches:</p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <strong>Focus on quality content</strong> - Promote content you genuinely believe in. Authenticity
                resonates with audiences.
              </li>
              <li className="mt-2">
                <strong>Leverage your existing audience</strong> - Use your social media platforms, email lists, or
                other channels to share your referral links.
              </li>
              <li className="mt-2">
                <strong>Create valuable context</strong> - Don't just share links. Explain why you love the content and
                why others might too.
              </li>
              <li className="mt-2">
                <strong>Target the right audience</strong> - Share content with people who are likely to be interested
                in that specific type of content.
              </li>
              <li className="mt-2">
                <strong>Track your performance</strong> - Use Slydr's analytics to see which content and promotion
                strategies are most effective.
              </li>
            </ul>

            <h2 id="tracking-and-analytics" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Tracking and Analytics
            </h2>
            <p>Slydr provides robust analytics to help both creators and fans track their performance:</p>

            <h3 className="text-xl font-medium mt-6 mb-3">For Creators</h3>
            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <strong>Sales data</strong> - Track initial sales and resales over time.
              </li>
              <li className="mt-2">
                <strong>Promoter insights</strong> - See which fans are driving the most sales.
              </li>
              <li className="mt-2">
                <strong>Content performance</strong> - Compare how different content pieces are performing.
              </li>
              <li className="mt-2">
                <strong>Revenue breakdown</strong> - Analyze your earnings from initial sales vs. royalties.
              </li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">For Fans</h3>
            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <strong>Commission tracking</strong> - Monitor your earnings from each piece of content.
              </li>
              <li className="mt-2">
                <strong>Link performance</strong> - See how many clicks and conversions your links are generating.
              </li>
              <li className="mt-2">
                <strong>Audience insights</strong> - Understand which types of content resonate with your audience.
              </li>
            </ul>

            <h2 id="legal-considerations" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Legal Considerations
            </h2>
            <p>
              While resale rights on Slydr are designed to be straightforward, there are some legal aspects to be aware
              of:
            </p>

            <ul className="my-6 ml-6 list-disc">
              <li className="mt-2">
                <strong>Content ownership</strong> - Creators retain ownership of their intellectual property. Resale
                rights only grant the ability to promote and resell access to the content.
              </li>
              <li className="mt-2">
                <strong>Usage restrictions</strong> - Buyers can access and enjoy the content but cannot modify,
                redistribute, or claim it as their own.
              </li>
              <li className="mt-2">
                <strong>Tax implications</strong> - Earnings from both content sales and resale commissions may be
                taxable. Consult with a tax professional regarding your specific situation.
              </li>
              <li className="mt-2">
                <strong>Promotional guidelines</strong> - When promoting content, ensure your marketing claims are
                accurate and comply with relevant advertising regulations.
              </li>
            </ul>

            <h2 id="conclusion" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-10 mb-4">
              Conclusion
            </h2>
            <p>
              Resale rights represent a paradigm shift in how content is monetized online. By aligning the incentives of
              creators and fans, Slydr creates a collaborative ecosystem where everyone can win. Whether you're a
              creator looking to maximize your earnings or a fan wanting to profit from your influence, understanding
              how resale rights work is key to success on the platform.
            </p>

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
                  <a href="#what-are-resale-rights" className="block py-2 text-sm hover:text-primary">
                    What Are Resale Rights?
                  </a>
                  <a href="#benefits-for-creators" className="block py-2 text-sm hover:text-primary">
                    Benefits for Creators
                  </a>
                  <a href="#benefits-for-fans" className="block py-2 text-sm hover:text-primary">
                    Benefits for Fans
                  </a>
                  <a href="#how-commissions-work" className="block py-2 text-sm hover:text-primary">
                    How Commissions Work
                  </a>
                  <a href="#strategies-for-creators" className="block py-2 text-sm hover:text-primary">
                    Strategies for Creators
                  </a>
                  <a href="#strategies-for-fans" className="block py-2 text-sm hover:text-primary">
                    Strategies for Fans
                  </a>
                  <a href="#tracking-and-analytics" className="block py-2 text-sm hover:text-primary">
                    Tracking and Analytics
                  </a>
                  <a href="#legal-considerations" className="block py-2 text-sm hover:text-primary">
                    Legal Considerations
                  </a>
                  <a href="#conclusion" className="block py-2 text-sm hover:text-primary">
                    Conclusion
                  </a>
                </nav>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Related Guides</h3>
                <div className="space-y-4">
                  <Link href="/guides/getting-started" className="block text-sm hover:text-primary">
                    Getting Started with Slydr
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
                <h3 className="text-lg font-medium mb-2">Ready to start earning?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your wallet and explore content you can promote and resell.
                </p>
                <Button className="w-full">Explore Marketplace</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

