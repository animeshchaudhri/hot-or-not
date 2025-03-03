"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Flame, Trophy } from "lucide-react"

const generateMockLeaderboardData = (count: number) => {
  const data = []
  for (let i = 0; i < count; i++) {
    data.push({
      id: i + 1,
      name: `Person ${i + 1}`,
      image: `/placeholder.svg?height=100&width=100`,
      score: Math.floor(2000 - i * 5 + Math.random() * 20),
      votes: Math.floor(100 + Math.random() * 900),
    })
  }
  return data.sort((a, b) => b.score - a.score)
}

const mockLeaderboardData = generateMockLeaderboardData(100)

export default function Leaderboard() {
  const [leaderboardItems, setLeaderboardItems] = useState(mockLeaderboardData.slice(0, 20))
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const loaderRef = useRef<HTMLDivElement>(null)

  const loadMoreItems = useCallback(() => {
    if (isLoading) return

    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const nextPage = page + 1
      const startIndex = page * 20
      const endIndex = startIndex + 20
      const newItems = mockLeaderboardData.slice(startIndex, endIndex)

      if (newItems.length > 0) {
        setLeaderboardItems((prev) => [...prev, ...newItems])
        setPage(nextPage)
      }

      setIsLoading(false)
    }, 1000)
  }, [isLoading, page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && !isLoading) {
          loadMoreItems()
        }
      },
      { threshold: 0.1 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [isLoading, loadMoreItems])

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Hotness Leaderboard</h2>
        <p className="mt-2 text-sm text-muted-foreground">See who's ranked the hottest based on votes.</p>
      </div>

      <div className="space-y-4">
        {leaderboardItems.map((person, index) => (
          <LeaderboardItem key={person.id} person={person} rank={index + 1} />
        ))}

        <div ref={loaderRef} className="py-4">
          {isLoading && (
            <div className="space-y-4">
              <LeaderboardItemSkeleton />
              <LeaderboardItemSkeleton />
              <LeaderboardItemSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface LeaderboardItemProps {
  person: {
    id: number
    name: string
    image: string
    score: number
    votes: number
  }
  rank: number
}

function LeaderboardItem({ person, rank }: LeaderboardItemProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 mr-4">
            {rank === 1 ? (
              <Trophy className="h-8 w-8 text-yellow-500" />
            ) : rank === 2 ? (
              <Trophy className="h-8 w-8 text-gray-400" />
            ) : rank === 3 ? (
              <Trophy className="h-8 w-8 text-amber-700" />
            ) : (
              <span className="text-xl font-bold text-muted-foreground">{rank}</span>
            )}
          </div>

          <div className="relative h-12 w-12 overflow-hidden rounded-full mr-4">
            <Image src={person.image || "/placeholder.svg"} alt={person.name} fill className="object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{person.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Flame className="h-3 w-3 text-red-500" />
                {person.score} points
              </span>
              <span>•</span>
              <span>{person.votes} votes</span>
            </div>
          </div>

          <Badge variant={rank <= 10 ? "default" : "outline"} className="ml-2">
            {rank <= 10 ? "Top 10" : `Rank ${rank}`}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function LeaderboardItemSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full mr-4" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

