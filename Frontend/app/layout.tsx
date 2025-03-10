import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from '@vercel/analytics/next';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hot or Not - Compare and Vote",
  description: "Vote on who's hotter in Chitkara and see the rankings on our leaderboard.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer />
        <Analytics />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="2af47a21-d406-463c-b565-195022bbe950"></script>
      </body>
    </html>
  )
}