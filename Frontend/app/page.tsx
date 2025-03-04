import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container max-w-md mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-primary">Hot</span>
          <span> or </span>
          <span className="text-primary">Not</span>
        </h1>
        
        <div className="bg-red-100 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
            The fun has ended
          </h2>
          <p className="text-gray-800 dark:text-gray-200 mb-4">
            Unfortunately, some people couldn't take a joke, so we had to shut down the site.
          </p>
          <Link 
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Click here for more information
          </Link>
        </div>
        
        <footer className="text-sm text-muted-foreground">
          <p className="mb-2">
            Made with not ❤️ by <Link href="https://x.com/animesh_xd" className="text-primary hover:underline">Animesh</Link> and <Link href="https://x.com/Shreverrr" className="text-primary hover:underline">Shreshth</Link>
          </p>
          <p className="text-xs">
            Disclaimer: This data was publicly hosted by the Uni. We don't own this data lol.
          </p>
        </footer>
      </div>
    </div>
  )
}