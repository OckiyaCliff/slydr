import { Upload, ShoppingCart, BarChart3 } from "lucide-react"

export default function HowItWorks() {
  return (
    <section className="container px-4 py-12 md:py-24 bg-muted/30">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How Slydr Works</h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          A transparent blockchain marketplace that benefits both creators and fans
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Creators Upload</h3>
          <p className="text-muted-foreground">
            Artists, musicians, and designers upload exclusive content and set resale rights and royalty percentages.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              1
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <ShoppingCart className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Fans Purchase</h3>
          <p className="text-muted-foreground">
            Fans buy content with resale rights, allowing them to promote and resell to other users on the platform.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              2
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Everyone Earns</h3>
          <p className="text-muted-foreground">
            Smart contracts automatically distribute royalties to creators and profits to resellers on each transaction.
          </p>
          <div className="mt-6 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              3
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 p-6 rounded-lg bg-card shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <h4 className="text-lg font-semibold mb-2">For Creators</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Upload exclusive content</li>
              <li>Set resale rights and royalty percentages</li>
              <li>Earn passive income from all future resales</li>
              <li>Build a dedicated fan community</li>
            </ul>
          </div>

          <div className="text-center p-4">
            <h4 className="text-lg font-semibold mb-2">For Fans</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Access exclusive content</li>
              <li>Earn by promoting and reselling</li>
              <li>Support favorite creators directly</li>
              <li>Build a collection of valuable digital assets</li>
            </ul>
          </div>

          <div className="text-center p-4">
            <h4 className="text-lg font-semibold mb-2">Blockchain Benefits</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Transparent transactions on Solana</li>
              <li>Low fees and fast processing</li>
              <li>Verifiable ownership and provenance</li>
              <li>Automated royalty distribution</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

