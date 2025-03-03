"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Flame } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "./ui/use-toast"

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
      if (!response.ok) {
        // Check if it's a rate limit error
        if (response.status === 429) {
          toast({
            title: "Slow down!",
            description: "You're voting too fast. Please wait a moment.",
            variant: "destructive",
          })
          return
        }
        
        throw new Error(`Server responded with ${response.status}`)
      }
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
      if (selectedPerson) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/random-chutpaglu-match`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id: selectedPerson._id
          })
        })
      
      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Rate limited",
            description: "You're voting too fast. Please wait a moment.",
            variant: "destructive",
          })
          return
        }
        throw new Error(`Server responded with ${response.status}`)
      }
    }
    } catch (error) {
      console.error('Error submitting vote:', error)
    }

    setTimeout(() => {
      fetchNewPair()
      setSelectedSide(null)
      setIsAnimating(false)
    }, 800)
  }

  return (
    <div className="mx-auto max-w-3xl px-2">
      <div className="mb-3 text-center">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Who's Hotter?</h2>
        <p className="mt-1 text-xs text-muted-foreground">Choose between the two people below.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
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
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium">VS</span>
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

      <div className="mt-3 flex justify-center">
        <Button
          variant="outline"
          size="sm"
          className="gap-1"
          onClick={fetchNewPair}
          disabled={isLoading || isAnimating}
        >
          Skip <ArrowRight className="h-3 w-3" />
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
        isSelected && "ring-1 ring-primary ring-offset-1",
        isAnimating && !isSelected && "opacity-50 scale-95",
      )}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[1/1] w-full overflow-hidden">
          <Image src={person.imageURL || "/placeholder.svg"} alt={person.name} fill className="object-cover" priority />
        </div>
        <div className="p-2">
          <h3 className="text-sm font-semibold truncate">{person.name}</h3>
          <Button className="mt-2 w-full gap-1 text-xs py-1 h-8" onClick={onVote} disabled={isAnimating} size="sm">
            <Flame className="h-3 w-3" />
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
        <div className="relative aspect-[1/1] w-full">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="p-2">
          <Skeleton className="h-4 w-2/3 mb-2" />
          <Skeleton className="h-8 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}