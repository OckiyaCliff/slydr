import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Twitter, Linkedin, Github } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Revolutionizing Digital Content Ownership</h1>
          <p className="text-xl text-muted-foreground">
            Slydr is a blockchain-powered platform that enables creators to sell resale rights, allowing fans to earn
            from promotion while creators receive ongoing royalties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/marketplace">Explore Marketplace</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/learn">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=600&width=800" alt="Slydr Platform" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building a future where creators and fans collaborate to create value together, powered by blockchain
            technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                </svg>
              </div>
              <CardTitle>Empower Creators</CardTitle>
              <CardDescription>
                We provide creators with new revenue streams and direct connections to their audience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Through our innovative resale rights model, creators can earn ongoing royalties from their content as it
                spreads across the platform, creating sustainable income.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <CardTitle>Reward Fans</CardTitle>
              <CardDescription>
                We enable fans to earn by promoting the content they love to their networks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Fans can purchase resale rights and earn commissions when they successfully promote and resell content,
                creating a collaborative ecosystem where everyone benefits.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
                  <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
                  <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
                  <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
                </svg>
              </div>
              <CardTitle>Blockchain Innovation</CardTitle>
              <CardDescription>
                We leverage Solana blockchain technology to ensure transparent, secure transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform uses blockchain to track ownership, manage resale rights, and automatically distribute
                royalties, creating a trustless system that benefits all participants.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From idea to reality: How Slydr is changing the creator economy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge className="bg-primary text-primary-foreground">2022</Badge>
              <h3 className="text-2xl font-bold">The Beginning</h3>
              <p className="text-muted-foreground">
                Slydr began with a simple question: What if fans could earn by promoting the content they love? Our
                founders, passionate about both blockchain technology and the creator economy, saw an opportunity to
                build a platform that would benefit both creators and their audiences.
              </p>
            </div>

            <div className="space-y-4">
              <Badge className="bg-primary text-primary-foreground">2023 -2024</Badge>
              <h3 className="text-2xl font-bold">Development & Beta</h3>
              <p className="text-muted-foreground">
                After months of research and development, we launched our beta platform with a small group of creators
                and fans. The feedback was overwhelmingly positive, confirming our belief that this model could
                revolutionize how digital content is monetized.
              </p>
            </div>

            <div className="space-y-4">
              <Badge className="bg-primary text-primary-foreground">2025</Badge>
              <h3 className="text-2xl font-bold">Public Launch</h3>
              <p className="text-muted-foreground">
                With a refined platform and growing community, Slydr officially launched to the public. We've been
                growing steadily ever since, onboarding creators across various niches and building a passionate
                community of fans who are now earning from their promotion efforts.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=800&width=800" alt="Slydr Journey" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The passionate individuals building the future of the creator economy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="https://ik.imagekit.io/y6cdhyax5/WhatsApp%20Image%202024-12-10%20at%2008(1).55?updatedAt=1741211857493"
                    alt="Alex Chen"
                  />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>Ockiya Cliff</CardTitle>
              <CardDescription>Founder & CEO</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Former tech executive with a passion for blockchain and creator empowerment.
              </p>
              <div className="flex justify-center gap-4">
                <Button asChild variant="ghost" size="icon">
                  <a href="https://x.com/ObaOFArt" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon">
                  <a
                    href="https://www.linkedin.com/in/ockiya-cliff-83534522b/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=200&width=200" alt="Maya Rodriguez" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>Maya Rodriguez</CardTitle>
              <CardDescription>Co-Founder & CTO</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Blockchain developer with extensive experience in decentralized applications.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=200&width=200" alt="David Kim" />
                  <AvatarFallback>DK</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>David Kim</CardTitle>
              <CardDescription>Head of Product</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Product strategist with a background in UX design and creator platforms.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=200&width=200" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>Sarah Johnson</CardTitle>
              <CardDescription>Head of Community</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Community builder with experience in creator partnerships and engagement.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Investors Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Backed By</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're proud to be supported by leading investors in blockchain and creator economy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          <div className="flex justify-center">
            <div className="h-16 w-48 relative">
              <Image src="/placeholder.svg?height=100&width=200" alt="Investor 1" fill className="object-contain" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-16 w-48 relative">
              <Image src="/placeholder.svg?height=100&width=200" alt="Investor 2" fill className="object-contain" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-16 w-48 relative">
              <Image src="/placeholder.svg?height=100&width=200" alt="Investor 3" fill className="object-contain" />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-16 w-48 relative">
              <Image src="/placeholder.svg?height=100&width=200" alt="Investor 4" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-lg bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Join the Slydr Revolution</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Whether you're a creator looking to monetize your content or a fan wanting to support creators and earn from
          promotion, Slydr has everything you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/marketplace">Explore Marketplace</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/learn">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

