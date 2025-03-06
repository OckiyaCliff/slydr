import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, HelpCircle, Mail, MessageSquare, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Support | Slydr",
  description: "Get help and support for the Slydr platform",
}

export default function SupportPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">Help & Support</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How Can We Help You?</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get the support you need to make the most of Slydr
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-2">Documentation</CardTitle>
                <CardDescription>Browse our comprehensive documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find detailed guides, tutorials, and reference materials to help you use Slydr effectively.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="outline">
                  <Link href="/docs">
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center">
                  <HelpCircle className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-2">FAQ</CardTitle>
                <CardDescription>Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse our frequently asked questions to find quick answers to common inquiries.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="outline">
                  <Link href="/faq">
                    View FAQ
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center">
                  <MessageSquare className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="mt-2">Community</CardTitle>
                <CardDescription>Join our community forums</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with other Slydr users, share experiences, and get help from the community.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild variant="outline">
                  <Link href="https://discord.gg/slydr" target="_blank" rel="noopener noreferrer">
                    Join Discord
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="contact" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="contact">Contact Us</TabsTrigger>
                  <TabsTrigger value="ticket">Submit a Ticket</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="contact" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Email Support</CardTitle>
                      <CardDescription>Send us an email and we'll get back to you within 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      <a href="mailto:support@slydr.io" className="text-primary hover:underline">
                        support@slydr.io
                      </a>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Live Chat</CardTitle>
                      <CardDescription>Chat with our support team in real-time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">Available Monday to Friday, 9am - 5pm UTC</p>
                      <Button>
                        Start Chat
                        <MessageSquare className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Schedule a Call</CardTitle>
                    <CardDescription>Book a call with our support team for personalized assistance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      For complex issues or detailed discussions, schedule a call with our support specialists
                    </p>
                    <Button variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Schedule a Call
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ticket" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Support Ticket</CardTitle>
                    <CardDescription>
                      Fill out the form below and our team will respond as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input id="name" placeholder="Your name" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input id="email" type="email" placeholder="Your email" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <Input id="subject" placeholder="Brief description of your issue" />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                          Category
                        </label>
                        <select id="category" className="w-full p-2 rounded-md border border-input bg-background">
                          <option value="">Select a category</option>
                          <option value="account">Account Issues</option>
                          <option value="wallet">Wallet Connection</option>
                          <option value="content">Content Upload/Management</option>
                          <option value="purchase">Purchase Problems</option>
                          <option value="resale">Resale Issues</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea id="message" placeholder="Please describe your issue in detail" rows={5} />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="attachments" className="text-sm font-medium">
                          Attachments (optional)
                        </label>
                        <Input id="attachments" type="file" multiple />
                        <p className="text-xs text-muted-foreground">
                          Max file size: 10MB. Supported formats: JPG, PNG, PDF
                        </p>
                      </div>

                      <Button type="submit" className="w-full">
                        Submit Ticket
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Additional Resources</h2>
            <p className="max-w-[700px] text-muted-foreground">
              Explore these resources to learn more about Slydr and get the most out of the platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ResourceCard
              title="Getting Started Guide"
              description="A comprehensive guide for new users"
              href="/guides/getting-started"
            />
            <ResourceCard
              title="Creator Handbook"
              description="Everything creators need to know"
              href="/guides/creator-handbook"
            />
            <ResourceCard
              title="Blockchain Basics"
              description="Learn about blockchain technology"
              href="/learn/blockchain-basics"
            />
            <ResourceCard title="Video Tutorials" description="Step-by-step video guides" href="/resources/videos" />
          </div>
        </div>
      </section>
    </main>
  )
}

function ResourceCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href={href}>
            View Resource
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

