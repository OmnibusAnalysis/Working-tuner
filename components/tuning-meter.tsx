"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TuningMeterProps {
  isPlaying: boolean
  note: string
}

export function TuningMeter({ isPlaying, note }: TuningMeterProps) {
  const [meterValue, setMeterValue] = useState(50) // 0-100 scale, 50 is perfect
  const [meterAnimation, setMeterAnimation] = useState(0)

  useEffect(() => {
    if (isPlaying) {
      // Simulate a tuning meter with random slight variations
      // In a real app, this would use microphone input to detect actual pitch
      const intervalId = setInterval(() => {
        // Randomly oscillate around 50 (perfect tuning) with small variations
        setMeterValue(Math.floor(Math.random() * 10) + 45)
        setMeterAnimation((prev) => (prev + 1) % 4)
      }, 300)

      return () => clearInterval(intervalId)
    } else {
      setMeterValue(50)
      setMeterAnimation(0)
    }
  }, [isPlaying])

  const getMeterColor = () => {
    if (meterValue >= 45 && meterValue <= 55) return "text-green-500"
    if (meterValue >= 35 && meterValue <= 65) return "text-yellow-500"
    return "text-red-500"
  }

  const getMeterText = () => {
    if (meterValue >= 45 && meterValue <= 55) return "In Tune"
    if (meterValue < 50) return "Flat"
    return "Sharp"
  }

  return (
    <div
      className={cn(
        "bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 transition-opacity duration-300",
        isPlaying ? "opacity-100" : "opacity-50",
      )}
    >
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold mb-2">{isPlaying ? note : "—"}</div>

        <div className="w-full h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden relative mb-2">
          {/* Meter markers */}
          <div className="absolute inset-0 flex justify-between px-4">
            <div className="h-full w-0.5 bg-red-400/50"></div>
            <div className="h-full w-0.5 bg-yellow-400/50"></div>
            <div className="h-full w-0.5 bg-green-500/50"></div>
            <div className="h-full w-0.5 bg-yellow-400/50"></div>
            <div className="h-full w-0.5 bg-red-400/50"></div>
          </div>

          {/* Meter needle */}
          <div
            className={cn(
              "absolute top-0 bottom-0 w-1 bg-amber-600 transition-all duration-300",
              isPlaying ? "opacity-100" : "opacity-0",
            )}
            style={{
              left: `${meterValue}%`,
              transform: "translateX(-50%)",
              boxShadow: isPlaying ? "0 0 5px rgba(255, 191, 0, 0.7)" : "none",
            }}
          ></div>
        </div>

        <div className={cn("text-sm font-medium transition-colors duration-300", getMeterColor())}>
          {isPlaying ? getMeterText() : "Play a note to tune"}
        </div>

        {isPlaying && (
          <div className="flex gap-1 mt-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-150",
                  i <= meterAnimation ? "bg-amber-500 scale-100" : "bg-zinc-300 dark:bg-zinc-600 scale-75",
                )}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
