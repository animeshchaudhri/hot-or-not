"use client"

import { useEffect, useState } from 'react'

export default function CountdownTimer({ targetDate }: { targetDate: string | Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime()
      
      if (difference <= 0) {
        setIsExpired(true)
        return { hours: 0, minutes: 0, seconds: 0 }
      }
      
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    setTimeLeft(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [targetDate])

//   if (isExpired) {
//     return <span>App is now closed forever. Womp womp!</span>
//   }

  return (
    <span>
      App will be closed forever at 10 PM IST today!  ⏱️ womp womp
    </span>
  )
}