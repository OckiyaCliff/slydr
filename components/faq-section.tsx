"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HelpCircle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function FaqSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is Slydr?",
      answer:
        "Slydr is a blockchain-powered platform where creators—artists, musicians, and designers—can sell resale rights to their exclusive content, allowing fans to promote and resell it while sharing royalties. Built on Solana, it provides a transparent, decentralized marketplace that benefits both creators and fans.",
    },
    {
      question: "How do resale rights work?",
      answer:
        "When you purchase content on Slydr, you not only get access to the content but also the right to resell it to other users. Each time you resell, you earn a profit while the original creator receives a royalty percentage. This creates a win-win ecosystem where both creators and fans can monetize content.",
    },
    {
      question: "What types of content can I find on Slydr?",
      answer:
        "Slydr supports various types of digital content including digital art, music, design templates, 3D models, and more. Creators can upload and sell almost any type of digital content that can be distributed electronically.",
    },
    {
      question: "How are royalties distributed?",
      answer:
        "Royalties are automatically distributed through smart contracts on the Solana blockchain. When a piece of content is resold, the smart contract automatically sends the specified percentage to the original creator and the rest to the reseller. This ensures transparent and immediate payments.",
    },
    {
      question: "Do I need cryptocurrency to use Slydr?",
      answer:
        "Yes, Slydr operates on the Solana blockchain, so you'll need SOL (Solana's native cryptocurrency) to make purchases. However, we've made the process as simple as possible with easy wallet integration and clear instructions for newcomers to Web3.",
    },
    {
      question: "How do I get started as a creator?",
      answer:
        "To get started as a creator, simply sign up for an account, connect your Solana wallet, and start uploading your content. You can set your prices and royalty percentages, add descriptions, and publish your work to the marketplace.",
    },
  ]

  return (
    <section className="container px-4 py-12 md:py-24 bg-muted/30">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
          <span className="font-medium text-primary">Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Got Questions?</h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Find answers to the most common questions about Slydr and how it works
        </p>
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-muted"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AccordionTrigger className="text-left hover:no-underline py-4 relative">
                <div className="flex items-start">
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full"
                      layoutId="faqHighlight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span className="ml-2 font-medium">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground py-4 px-2">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
        <p className="text-muted-foreground">
          Still have questions? Check out our detailed documentation or contact support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="outline" className="group">
            <Link href="/docs">
              <HelpCircle className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
              <span>Documentation</span>
            </Link>
          </Button>
          <Button asChild>
            <Link href="/support">
              <span>Contact Support</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

