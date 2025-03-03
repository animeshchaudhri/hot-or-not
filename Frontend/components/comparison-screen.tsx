"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

const mockPeople = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "/placeholder.svg?height=500&width=400",
    rating: 1500,
  },
  {
    id: 2,
    name: "Jamie Smith",
    image: "/placeholder.svg?height=500&width=400",
    rating: 1520,
  },
  {
    id: 3,
    name: "Taylor Wilson",
    image: "/placeholder.svg?height=500&width=400",
    rating: 1480,
  },
  {
    id: 4,
    name: "Jordan Lee",
    image: "/placeholder.svg?height=500&width=400",
    rating: 1550,
  },
  {
    id: 5,
    name: "Casey Brown",
    image: "/placeholder.svg?height=500&width=400",
    rating: 1510,
  },
  {
    id: 6,
    name: "Riley Davis",
    image: "/placeholder.svg?height=500&width=400",
    rating: 1490,
  },
]

export default function ComparisonScreen() {
  const [leftPerson, setLeftPerson] = useState(mockPeople[0])
  const [rightPerson, setRightPerson] = useState(mockPeople[1])
  const [selectedSide, setSelectedSide] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleVote = (side: "left" | "right") => {
    setSelectedSide(side)
    setIsAnimating(true)

    setTimeout(() => {
      // Get two random people that are different from each other
      let newLeft, newRight
      do {
        newLeft = mockPeople[Math.floor(Math.random() * mockPeople.length)]
        newRight = mockPeople[Math.floor(Math.random() * mockPeople.length)]
      } while (newLeft.id === newRight.id)

      setLeftPerson(newLeft)
      setRightPerson(newRight)
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
      </div>

      <div className="mt-6 flex justify-center">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => {
            // Skip current comparison
            let newLeft, newRight
            do {
              newLeft = mockPeople[Math.floor(Math.random() * mockPeople.length)]
              newRight = mockPeople[Math.floor(Math.random() * mockPeople.length)]
            } while (newLeft.id === newRight.id || (newLeft.id === leftPerson.id && newRight.id === rightPerson.id))

            setLeftPerson(newLeft)
            setRightPerson(newRight)
          }}
        >
          Skip <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface PersonCardProps {
  person: {
    id: number
    name: string
    image: string
    rating: number
  }
  isSelected: boolean
  isAnimating: boolean
  onVote: () => void
  side: "left" | "right"
}

function PersonCard({ person, isSelected, isAnimating, onVote, side }: PersonCardProps) {
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
          <Image src={person.image || "/placeholder.svg"} alt={person.name} fill className="object-cover" priority />
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

