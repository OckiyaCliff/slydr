import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Search } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ | Slydr",
  description: "Frequently asked questions about the Slydr platform",
}

export default function FaqPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">Help Center</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to the most common questions about Slydr
              </p>
            </div>
            <div className="w-full max-w-md space-y-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search questions..."
                  className="w-full bg-background py-2 pl-8 pr-4 rounded-md border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="general" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="creators">Creators</TabsTrigger>
                <TabsTrigger value="fans">Fans</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="general" className="space-y-8">
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">What is Slydr?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Slydr is a blockchain-powered platform where creators—artists, musicians, and designers—can sell
                      resale rights to their exclusive content, allowing fans to promote and resell it while sharing
                      royalties. Built on Solana, it provides a transparent, decentralized marketplace that benefits
                      both creators and fans.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">How do resale rights work?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      When you purchase content on Slydr, you not only get access to the content but also the right to
                      resell it to other users. Each time you resell, you earn a profit while the original creator
                      receives a royalty percentage. This creates a win-win ecosystem where both creators and fans can
                      monetize content.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">What types of content can I find on Slydr?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Slydr supports various types of digital content including digital art, music, design templates, 3D
                      models, and more. Creators can upload and sell almost any type of digital content that can be
                      distributed electronically.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">How are royalties distributed?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Royalties are automatically distributed through smart contracts on the Solana blockchain. When a
                      piece of content is resold, the smart contract automatically sends the specified percentage to the
                      original creator and the rest to the reseller. This ensures transparent and immediate payments.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">Do I need cryptocurrency to use Slydr?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Yes, Slydr operates on the Solana blockchain, so you'll need SOL (Solana's native cryptocurrency)
                      to make purchases. However, we've made the process as simple as possible with easy wallet
                      integration and clear instructions for newcomers to Web3.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">Is Slydr available worldwide?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Yes, Slydr is available globally. Since it operates on the blockchain, anyone with an internet
                      connection and a Solana wallet can access and use the platform, regardless of their location.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="creators" className="space-y-8">
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="creator-1" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">How do I get started as a creator?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      To get started as a creator, simply sign up for an account, connect your Solana wallet, and start
                      uploading your content. You can set your prices and royalty percentages, add descriptions, and
                      publish your work to the marketplace.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="creator-2" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">How do I set royalty percentages?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      When uploading content, you can set your royalty percentage, which is the portion of each resale
                      that you'll receive. We recommend setting a percentage that balances your earnings with incentives
                      for resellers. The platform default is 15%, but you can adjust this based on your preferences.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="creator-3" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">What file formats are supported?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Slydr supports a wide range of file formats including images (JPG, PNG, GIF, SVG), audio (MP3,
                      WAV), video (MP4, MOV), documents (PDF), and 3D models (GLB, GLTF). The maximum file size is 500MB
                      per upload.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="creator-4" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">How do I track my earnings?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      You can track your earnings in real-time through your creator dashboard. The dashboard provides
                      detailed analytics on sales, royalties, views, and other metrics to help you understand your
                      performance and optimize your strategy.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="creator-5" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">Can I offer subscription-based content?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Yes, Slydr supports subscription tiers for exclusive content. You can create different
                      subscription levels with varying benefits and price points, allowing fans to subscribe to your
                      content on a recurring basis.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="fans" className="space-y-8">
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="fan-1" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">How do I purchase content?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      To purchase content, connect your Solana wallet, browse the marketplace, and click on the content
                      you want to buy. Review the details, click "Purchase," and confirm the transaction in your wallet.
                      Once the transaction is complete, you'll have access to the content and the right to resell it.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fan-2" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">How do I resell content?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      After purchasing content, you can resell it by going to your collection, selecting the content,
                      and clicking "Resell." You can set your own price (above the minimum set by the creator) and share
                      your unique resale link on social media or directly with potential buyers.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fan-3" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">How much can I earn from reselling?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Your earnings from reselling depend on the price you set and the royalty percentage set by the
                      creator. For example, if you resell content for 10 SOL with a 15% royalty, you'll earn 8.5 SOL and
                      the creator will receive 1.5 SOL as royalty.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fan-4" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">Can I gift content to others?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Yes, you can gift content to others by purchasing it and transferring it to their wallet address.
                      The recipient will receive both the content and the resale rights, allowing them to enjoy and
                      potentially profit from the content as well.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fan-5" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">What happens if I lose access to my wallet?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      If you lose access to your wallet, you'll also lose access to your purchased content and earnings.
                      It's crucial to securely store your wallet's seed phrase or private key. Slydr cannot recover lost
                      wallets or transfer content between wallets without proper authorization.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-8">
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="tech-1" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">How does Slydr store content?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Slydr stores content on Arweave, a decentralized storage network that ensures your content remains
                      accessible permanently. Content metadata and ownership records are stored on the Solana
                      blockchain, providing a transparent and immutable record of all transactions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tech-2" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">What wallets are supported?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Slydr supports popular Solana wallets including Phantom, Solflare, Backpack, and Sollet. We
                      recommend using Phantom or Solflare for the best experience, as they offer comprehensive features
                      and regular updates.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tech-3" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">Are there any transaction fees?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Yes, there are two types of fees: Solana network fees (which are typically very low, around
                      0.000005 SOL per transaction) and Slydr platform fees (5% of each transaction). These fees help
                      maintain the platform and support ongoing development.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tech-4" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">Is my content protected?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      While Slydr provides secure storage and access control, digital content can be copied. We
                      recommend using watermarks, low-resolution previews, or other protection measures for preview
                      content. The value in Slydr comes from the verifiable ownership and resale rights, not just the
                      content itself.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tech-5" className="border-b border-muted">
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">Can I integrate Slydr with my website?</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground py-4 px-2">
                      Yes, Slydr offers API endpoints and embeddable widgets that allow you to integrate your Slydr
                      content and marketplace into your own website. Check our developer documentation for detailed
                      integration guides and examples.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Still Have Questions?</h2>
              <p className="max-w-[700px] md:text-xl/relaxed">
                Our support team is here to help you with any questions or issues you may have
              </p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="/support">
                <HelpCircle className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

