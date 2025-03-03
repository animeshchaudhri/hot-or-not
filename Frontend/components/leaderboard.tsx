"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useInView } from "react-intersection-observer"
import { Skeleton } from "@/components/ui/skeleton"

interface LeaderboardPerson {
  _id: string;
  name: string;
  imageURL: string;
  rank?: number;
}

export default function Leaderboard() {
  const [leaderboardItems, setLeaderboardItems] = useState<LeaderboardPerson[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView()

  const fetchLeaderboardData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard`)
      const data = await response.json()
      
      // Add index as position if rank is not provided
      const processedData = data.map((person: LeaderboardPerson, index: number) => ({
        ...person,
        position: person.rank || index + 1
      }))
      
      setLeaderboardItems(processedData)
      setHasMore(false) // Since we get all data at once
    } catch (error) {
      console.error("Failed to fetch leaderboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboardData()
  }, [])

  // Add fake infinite scroll simulation if needed
  const loadMoreItems = () => {
    // This is just placeholder code since the API returns all data at once
    // You could implement pagination if the API supports it
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setHasMore(false)
    }, 1000)
  }

  useEffect(() => {
    if (inView && hasMore) {
      loadMoreItems()
    }
  }, [inView, hasMore])

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Leaderboard</h2>
        <p className="mt-2 text-sm text-muted-foreground">Who's the hottest on campus?</p>
      </div>

      <div className="rounded-lg border">
        <div className="p-2">
          {leaderboardItems.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted/50"
            >
              <div className="flex-none text-center w-7">
                <span className="font-medium">{index + 1}</span>
              </div>
              
              <div className="relative overflow-hidden rounded-full h-10 w-10 flex-none">
                <Image 
                  src={item.imageURL || "/placeholder.svg"} 
                  alt={item.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.name}</p>
              </div>
              
              {item.rank && (
                <div className="flex-none">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                    Rank {item.rank}
                  </span>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="space-y-2 p-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-7 w-7 rounded-md" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-5 w-full max-w-[200px]" />
                </div>
              ))}
            </div>
          )}
          
          <div ref={ref} className="h-1" />
        </div>
      </div>
    </div>
  )
}