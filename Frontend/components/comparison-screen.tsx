"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

// Define the API response interface
interface Person {
  _id: string;
  name: string;
  imageURL: string;
}

export default function ComparisonScreen() {
  const [leftPerson, setLeftPerson] = useState<Person | null>(null)
  const [rightPerson, setRightPerson] = useState<Person | null>(null)
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Function to fetch a new pair
  const fetchNewPair = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/random-chutpaglu-match`)
      const data = await response.json()
      setLeftPerson(data[0])
      setRightPerson(data[1])
    } catch (error) {
      console.error('Error fetching comparison pair:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchNewPair()
  }, [])

  const handleVote = async (side: "left" | "right") => {
    setSelectedSide(side)
    setIsAnimating(true)

    const selectedPerson = side === "left" ? leftPerson : rightPerson
    
    try {
      // Submit vote
      if (selectedPerson) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}http://localhost:4000/random-chutpaglu-match`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id: selectedPerson._id
          })
        })
      }
    } catch (error) {
      console.error('Error submitting vote:', error)
    }

    // Get new pair after a delay
    setTimeout(() => {
      fetchNewPair()
      setSelectedSide(null)
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Who's Hotter?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Choose between the two people below.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
        {isLoading ? (
          <>
            <PersonCardSkeleton />
            <PersonCardSkeleton />
          </>
        ) : (
          <>
            <PersonCard
              person={leftPerson}
              isSelected={selectedSide === "left"}
              isAnimating={isAnimating}
              onVote={() => handleVote("left")}
              side="left"
            />

            <div className="flex items-center justify-center sm:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <span className="text-base font-medium">VS</span>
              </div>
            </div>

            <PersonCard
              person={rightPerson}
              isSelected={selectedSide === "right"}
              isAnimating={isAnimating}
              onVote={() => handleVote("right")}
              side="right"
            />
          </>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          className="gap-2"
          onClick={fetchNewPair}
          disabled={isLoading || isAnimating}
        >
          Skip <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface PersonCardProps {
  person: Person | null;
  isSelected: boolean;
  isAnimating: boolean;
  onVote: () => void;
  side: "left" | "right";
}

function PersonCard({ person, isSelected, isAnimating, onVote, side }: PersonCardProps) {
  if (!person) return <PersonCardSkeleton />
  
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300",
        isSelected && "ring-2 ring-primary ring-offset-2",
        isAnimating && !isSelected && "opacity-50 scale-95",
      )}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image src={person.imageURL || "/placeholder.svg"} alt={person.name} fill className="object-cover" priority />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{person.name}</h3>
          <Button className="mt-3 w-full gap-2" onClick={onVote} disabled={isAnimating}>
            <Flame className="h-4 w-4" />
            This One's Hotter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function PersonCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[4/5] w-full">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="p-4">
          <Skeleton className="h-6 w-2/3 mb-3" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

