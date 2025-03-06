import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, Linkedin, Github, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Team | Slydr",
  description: "Meet the talented team behind the Slydr platform",
}

// Team member data
const executiveTeam = [
  {
    name: "Ockiya Cliff",
    role: "Founder & CEO",
    bio: "Former tech executive with a passion for blockchain and creator empowerment. Led multiple successful startups in the digital content space.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com/ObaOFArt",
    linkedin: "https://www.linkedin.com/in/ockiya-cliff-83534522b/",
    github: "https://github.com/ockiya-cliff",
  },
  {
    name: "Maya Rodriguez",
    role: "Co-Founder & CTO",
    bio: "Blockchain developer with extensive experience in decentralized applications. Previously led engineering teams at major Web3 companies.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "David Kim",
    role: "Head of Product",
    bio: "Product strategist with a background in UX design and creator platforms. Passionate about building intuitive user experiences.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
]

const engineeringTeam = [
  {
    name: "Sarah Johnson",
    role: "Lead Frontend Engineer",
    bio: "React specialist with a focus on building beautiful, responsive user interfaces. Advocate for accessibility and inclusive design.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Michael Chen",
    role: "Blockchain Engineer",
    bio: "Solana expert with deep knowledge of smart contract development. Contributor to multiple open-source blockchain projects.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Aisha Patel",
    role: "Backend Engineer",
    bio: "Distributed systems specialist with experience building high-performance APIs and services. Passionate about scalable architecture.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
]

const designTeam = [
  {
    name: "Carlos Mendez",
    role: "Lead Designer",
    bio: "UI/UX designer with a background in digital product design. Focused on creating intuitive and delightful user experiences.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Emma Wilson",
    role: "Visual Designer",
    bio: "Visual designer with expertise in branding and illustration. Creates the visual language that brings Slydr to life.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
]

const marketingTeam = [
  {
    name: "James Lee",
    role: "Head of Marketing",
    bio: "Marketing strategist with experience in both Web2 and Web3 companies. Expert in community building and growth marketing.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
  {
    name: "Sophia Garcia",
    role: "Community Manager",
    bio: "Community builder with a passion for creator economies. Dedicated to fostering an engaged and supportive Slydr community.",
    image: "/placeholder.svg?height=400&width=400",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
]

export default function TeamPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">Our Team</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Meet the People Behind Slydr
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A passionate team of creators, engineers, and blockchain enthusiasts building the future of digital
                content
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Leadership Team</h2>
              <p className="text-muted-foreground">The visionaries guiding Slydr's mission and strategy</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {executiveTeam.map((member) => (
                <TeamMemberCard key={member.name} member={member} featured />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Team */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Engineering Team</h2>
              <p className="text-muted-foreground">
                The talented engineers building and maintaining the Slydr platform
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {engineeringTeam.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Design Team */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Design Team</h2>
              <p className="text-muted-foreground">
                The creative minds crafting Slydr's user experience and visual identity
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {designTeam.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Team */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Marketing & Community Team</h2>
              <p className="text-muted-foreground">The team connecting Slydr with creators and fans around the world</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {marketingTeam.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Team</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                We're always looking for talented individuals who are passionate about blockchain, creator economies,
                and building the future of digital content
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/careers">
                View Open Positions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function TeamMemberCard({ member, featured = false }: { member: any; featured?: boolean }) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${featured ? "border-primary/20" : ""}`}>
      <div className="aspect-square relative">
        <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-primary font-medium">{member.role}</p>
          </div>
          <p className="text-muted-foreground text-sm">{member.bio}</p>
          <div className="flex gap-3 pt-2">
            {member.twitter && (
              <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link>
            )}
            {member.linkedin && (
              <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
            )}
            {member.github && (
              <Link href={member.github} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

