import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ComparisonScreen from "@/components/comparison-screen"
import Leaderboard from "@/components/leaderboard"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-primary">Hot</span>
            <span>or</span>
            <span className="text-primary">Not</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4 sm:py-8">
          <Tabs defaultValue="compare" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto mb-6">
              <TabsTrigger value="compare">Compare</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            <TabsContent value="compare" className="mt-0">
              <ComparisonScreen />
            </TabsContent>
            <TabsContent value="leaderboard" className="mt-0">
              <Leaderboard />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-4">
        <div className="container text-center">
          <p className="text-xs text-muted-foreground">
            Made with not ❤️ by <Link href="https://x.com/animesh_xd" className="text-primary">Animesh</Link> and <Link href="https://x.com/Shreverrr" className="text-primary">Shreshth</Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

