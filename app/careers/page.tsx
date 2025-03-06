import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Careers | Slydr",
  description: "Join the Slydr team and help build the future of digital content",
}

// Job listing data
const engineeringJobs = [
  {
    id: "senior-blockchain-engineer",
    title: "Senior Blockchain Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "5+ years",
    description:
      "We're looking for an experienced blockchain engineer to help build and maintain our Solana-based smart contracts and infrastructure.",
    featured: true,
  },
  {
    id: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our frontend team to build beautiful, responsive, and performant user interfaces using React and Next.js.",
    featured: false,
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Help build and scale our backend services, APIs, and infrastructure to support millions of users and transactions.",
    featured: false,
  },
]

const productJobs = [
  {
    id: "product-manager",
    title: "Product Manager",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    experience: "4+ years",
    description:
      "We're seeking a product manager to help define and execute our product roadmap, working closely with engineering, design, and business teams.",
    featured: true,
  },
  {
    id: "ux-researcher",
    title: "UX Researcher",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Join our product team to conduct user research, gather insights, and help us build a product that truly meets our users' needs.",
    featured: false,
  },
]

const designJobs = [
  {
    id: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "We're looking for a product designer to create intuitive and beautiful user experiences for our platform.",
    featured: false,
  },
]

const marketingJobs = [
  {
    id: "growth-marketer",
    title: "Growth Marketer",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Join our marketing team to develop and execute growth strategies to acquire and retain users on our platform.",
    featured: true,
  },
  {
    id: "content-marketer",
    title: "Content Marketer",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Create compelling content to educate and engage our community about Slydr and the broader creator economy.",
    featured: false,
  },
]

export default function CareersPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                <span className="font-medium text-primary">Join Our Team</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Build the Future of Digital Content
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our team of passionate builders, creators, and innovators working to transform the creator economy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Why Join Slydr?</h2>
              <p className="text-muted-foreground">
                At Slydr, we're building a platform that empowers creators and fans alike. We're a team of passionate
                individuals who believe in the power of blockchain technology to transform the creator economy.
              </p>
              <div className="space-y-4 mt-6">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Mission-Driven</h3>
                    <p className="text-muted-foreground text-sm">
                      We're on a mission to empower creators and build a more equitable digital economy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Remote-First</h3>
                    <p className="text-muted-foreground text-sm">
                      Work from anywhere in the world with a flexible schedule that fits your life.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Continuous Learning</h3>
                    <p className="text-muted-foreground text-sm">
                      We invest in your growth with learning stipends, conference budgets, and mentorship.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Competitive Compensation</h3>
                    <p className="text-muted-foreground text-sm">
                      We offer competitive salaries, equity, and comprehensive benefits.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=400&width=600" alt="Slydr Team" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="w-full py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Open Positions</h2>
              <p className="text-muted-foreground">Join our team and help build the future of digital content</p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-5 mx-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="product">Product</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-8 space-y-8">
                {/* Featured Jobs */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Featured Positions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...engineeringJobs, ...productJobs, ...designJobs, ...marketingJobs]
                      .filter((job) => job.featured)
                      .map((job) => (
                        <JobCard key={job.id} job={job} featured />
                      ))}
                  </div>
                </div>

                {/* Engineering Jobs */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Engineering</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {engineeringJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>

                {/* Product Jobs */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Product</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {productJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>

                {/* Design Jobs */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Design</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {designJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>

                {/* Marketing Jobs */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Marketing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {marketingJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="engineering" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {engineeringJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="product" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {designJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="marketing" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketingJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Our Application Process</h2>
              <p className="text-muted-foreground">Here's what to expect when you apply to join the Slydr team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <CardTitle className="mt-2">Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Submit your application through our careers page. We review every application carefully.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <CardTitle className="mt-2">Initial Interview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    A 30-minute video call with a team member to discuss your background and interest in Slydr.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <CardTitle className="mt-2">Technical Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    A take-home assignment or technical interview relevant to the role you're applying for.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    4
                  </div>
                  <CardTitle className="mt-2">Final Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Meet with team members and leadership to discuss the role in depth and ensure mutual fit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* No Positions CTA */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Don't See a Position That Fits?</h2>
              <p className="max-w-[700px] md:text-xl/relaxed">
                We're always looking for talented individuals who are passionate about our mission. Send us your resume
                and we'll keep you in mind for future opportunities.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="mailto:careers@slydr.io">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

function JobCard({ job, featured = false }: { job: any; featured?: boolean }) {
  return (
    <Card className={`transition-all hover:shadow-md ${featured ? "border-primary/20" : ""}`}>
      <CardHeader>
        {featured && (
          <Badge className="w-fit mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-none">Featured</Badge>
        )}
        <CardTitle>{job.title}</CardTitle>
        <CardDescription>{job.department}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Briefcase className="h-3 w-3" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{job.experience}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/careers/${job.id}`}>
            View Position
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

