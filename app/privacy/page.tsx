import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Slydr",
  description: "Privacy policy for the Slydr platform",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Last updated: March 6, 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Introduction</h2>
              <p className="text-muted-foreground">
                Slydr ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
                we collect, use, disclose, and safeguard your information when you use our platform, website, and
                services (collectively, the "Service").
              </p>
              <p className="text-muted-foreground">
                Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you
                have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do not
                agree with our policies and practices, please do not use our Service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect several types of information from and about users of our Service, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Personal Information:</strong> This includes information that can be used to identify you,
                  such as your name, email address, and wallet address.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect information about how you interact with our Service, including
                  the pages you visit, the time and date of your visits, and the time spent on those pages.
                </li>
                <li>
                  <strong>Transaction Data:</strong> We collect information about the transactions you make on our
                  Service, including the content you purchase, sell, or resell, the transaction amounts, and transaction
                  dates.
                </li>
                <li>
                  <strong>Blockchain Data:</strong> As a blockchain-based platform, transactions on Slydr are recorded
                  on the Solana blockchain. This information is publicly available and may include wallet addresses and
                  transaction details.
                </li>
                <li>
                  <strong>Device Information:</strong> We collect information about the device you use to access our
                  Service, including the hardware model, operating system, unique device identifiers, and mobile network
                  information.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To provide, maintain, and improve our Service</li>
                <li>To process transactions and send transaction notifications</li>
                <li>To personalize your experience on our Service</li>
                <li>To communicate with you, including sending you updates, security alerts, and support messages</li>
                <li>To monitor and analyze usage patterns and trends</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Sharing Your Information</h2>
              <p className="text-muted-foreground">We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>With Service Providers:</strong> We may share your information with third-party vendors,
                  service providers, contractors, or agents who perform services for us or on our behalf.
                </li>
                <li>
                  <strong>For Business Transfers:</strong> We may share or transfer your information in connection with,
                  or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
                  portion of our business to another company.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may disclose your information for any other purpose with your
                  consent.
                </li>
                <li>
                  <strong>To Comply with Legal Obligations:</strong> We may disclose your information where required to
                  do so by law or in response to valid requests by public authorities.
                </li>
                <li>
                  <strong>To Protect Rights:</strong> We may disclose your information to protect the rights, property,
                  or safety of Slydr, our users, or others.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Data Security</h2>
              <p className="text-muted-foreground">
                We have implemented appropriate technical and organizational security measures designed to protect the
                security of any personal information we process. However, please also remember that we cannot guarantee
                that the internet itself is 100% secure. Although we will do our best to protect your personal
                information, transmission of personal information to and from our Service is at your own risk.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Your Data Protection Rights</h2>
              <p className="text-muted-foreground">
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>The right to access, update, or delete your information</li>
                <li>The right to rectification (to correct inaccurate information)</li>
                <li>The right to object to our processing of your information</li>
                <li>The right to restriction (to request that we restrict processing of your information)</li>
                <li>The right to data portability (to receive a copy of your information)</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p className="text-muted-foreground">
                To exercise any of these rights, please contact us using the contact information provided below.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children under 18. If you are a parent or guardian and you are aware that your child
                has provided us with personal information, please contact us so that we can take necessary actions.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy. You
                are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us with any privacy-related questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:privacy@slydr.io" className="text-primary hover:underline">
                      privacy@slydr.io
                    </a>
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/support">
                      Contact Support
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

