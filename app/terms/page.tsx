import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | Slydr",
  description: "Terms of service for the Slydr platform",
}

export default function TermsOfServicePage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Terms of Service</h1>
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
                Welcome to Slydr. These Terms of Service ("Terms") govern your access to and use of the Slydr platform,
                website, and services (collectively, the "Service"). By accessing or using the Service, you agree to be
                bound by these Terms. If you disagree with any part of the Terms, you may not access the Service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Definitions</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>"Slydr"</strong> (or "we", "our", or "us") refers to the company operating the Service.
                </li>
                <li>
                  <strong>"Service"</strong> refers to the Slydr platform, website, and related services.
                </li>
                <li>
                  <strong>"User"</strong> (or "you" or "your") refers to any individual or entity that accesses or uses
                  the Service.
                </li>
                <li>
                  <strong>"Creator"</strong> refers to a User who uploads and sells content on the Service.
                </li>
                <li>
                  <strong>"Content"</strong> refers to any digital assets, files, or materials uploaded to or made
                  available through the Service.
                </li>
                <li>
                  <strong>"Resale Rights"</strong> refers to the right to resell Content purchased on the Service,
                  subject to the terms and conditions specified by the Creator.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Account Registration</h2>
              <p className="text-muted-foreground">
                To access certain features of the Service, you may be required to register for an account. You agree to
                provide accurate, current, and complete information during the registration process and to update such
                information to keep it accurate, current, and complete.
              </p>
              <p className="text-muted-foreground">
                You are responsible for safeguarding your account credentials and for all activities that occur under
                your account. You agree to notify us immediately of any unauthorized use of your account or any other
                breach of security.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Wallet Connection</h2>
              <p className="text-muted-foreground">
                To use certain features of the Service, you must connect a compatible Solana wallet. You are solely
                responsible for the security of your wallet and any activities conducted through it. Slydr is not
                responsible for any loss of funds or unauthorized transactions that may occur as a result of wallet
                security issues.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Creator Terms</h2>
              <p className="text-muted-foreground">As a Creator, you agree to the following:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  You have the right to upload, sell, and distribute the Content you make available on the Service.
                </li>
                <li>
                  You grant Slydr a non-exclusive, worldwide, royalty-free license to use, display, and distribute your
                  Content for the purpose of operating the Service.
                </li>
                <li>You are responsible for setting the price and royalty percentage for your Content.</li>
                <li>
                  You understand that Users who purchase your Content may have the right to resell it, subject to the
                  terms and conditions you specify.
                </li>
                <li>
                  You will receive royalties from resales of your Content as specified in your Content settings and in
                  accordance with the smart contract governing the transaction.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">User Terms</h2>
              <p className="text-muted-foreground">As a User, you agree to the following:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  You will use the Service in compliance with these Terms and all applicable laws and regulations.
                </li>
                <li>
                  When purchasing Content, you will respect the rights of Creators and the terms and conditions
                  associated with the Content.
                </li>
                <li>
                  If you purchase Content with Resale Rights, you may resell the Content on the Service in accordance
                  with the terms specified by the Creator and the smart contract governing the transaction.
                </li>
                <li>You will not use the Service for any illegal or unauthorized purpose.</li>
                <li>
                  You will not attempt to circumvent any technological measures implemented to protect the Service or
                  the Content available through it.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Fees and Payments</h2>
              <p className="text-muted-foreground">
                Slydr charges a platform fee for transactions conducted on the Service. The fee amount is displayed at
                the time of transaction. Additionally, transactions on the Solana blockchain may incur network fees,
                which are separate from Slydr's platform fees.
              </p>
              <p className="text-muted-foreground">
                All payments and transactions on Slydr are processed through the Solana blockchain. Slydr does not store
                or process payment card details. All payment information is provided directly to our third-party payment
                processors.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Intellectual Property</h2>
              <p className="text-muted-foreground">
                The Service and its original content (excluding Content provided by users), features, and functionality
                are and will remain the exclusive property of Slydr and its licensors. The Service is protected by
                copyright, trademark, and other laws of both the United States and foreign countries.
              </p>
              <p className="text-muted-foreground">
                Creators retain ownership of the Content they upload to the Service, subject to the licenses granted to
                Slydr and Users as described in these Terms.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Prohibited Activities</h2>
              <p className="text-muted-foreground">You may not engage in any of the following prohibited activities:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Using the Service for any illegal purpose or in violation of any local, state, national, or
                  international law
                </li>
                <li>Harassing, abusing, or harming another person</li>
                <li>Impersonating another user or person</li>
                <li>Using another user's account without permission</li>
                <li>Attempting to circumvent any content filtering techniques we employ</li>
                <li>Attempting to access any portion of the Service that you are not authorized to access</li>
                <li>Engaging in any automated use of the system, such as using scripts to send comments or messages</li>
                <li>
                  Interfering with, disrupting, or creating an undue burden on the Service or the networks or services
                  connected to the Service
                </li>
                <li>
                  Uploading or transmitting viruses, Trojan horses, or other material that interferes with any party's
                  uninterrupted use and enjoyment of the Service
                </li>
                <li>Using the Service to advertise or offer to sell goods and services</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
                not limited to a breach of the Terms.
              </p>
              <p className="text-muted-foreground">
                If you wish to terminate your account, you may simply discontinue using the Service. However, Content
                that you have sold or purchased on the Service will remain on the blockchain and may continue to be
                accessible.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall Slydr, nor its directors, employees, partners, agents, suppliers, or affiliates, be
                liable for any indirect, incidental, special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your
                access to or use of or inability to access or use the Service; (ii) any conduct or content of any third
                party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or
                alteration of your transmissions or content, whether based on warranty, contract, tort (including
                negligence), or any other legal theory, whether or not we have been informed of the possibility of such
                damage.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Disclaimer</h2>
              <p className="text-muted-foreground">
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
                basis. The Service is provided without warranties of any kind, whether express or implied, including,
                but not limited to, implied warranties of merchantability, fitness for a particular purpose,
                non-infringement, or course of performance.
              </p>
              <p className="text-muted-foreground">
                Slydr does not warrant that (i) the Service will function uninterrupted, secure, or available at any
                particular time or location; (ii) any errors or defects will be corrected; (iii) the Service is free of
                viruses or other harmful components; or (iv) the results of using the Service will meet your
                requirements.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without
                regard to its conflict of law provisions.
              </p>
              <p className="text-muted-foreground">
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
                provisions of these Terms will remain in effect.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                What constitutes a material change will be determined at our sole discretion.
              </p>
              <p className="text-muted-foreground">
                By continuing to access or use our Service after any revisions become effective, you agree to be bound
                by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the
                Service.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
              <p className="text-muted-foreground">If you have any questions about these Terms, please contact us:</p>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us with any questions about our Terms of Service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:legal@slydr.io" className="text-primary hover:underline">
                      legal@slydr.io
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

