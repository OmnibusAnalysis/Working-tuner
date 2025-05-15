"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PolytuneDisplayProps {
  tuning: readonly string[]
  tuningStatus: ("flat" | "in-tune" | "sharp" | "none")[]
  currentString: number
  isPlaying: boolean
  mode: "poly" | "chromatic"
  onStringClick: (index: number) => void
  detectedNote?: string | null
  detectedCents?: number
}

export function PolytuneDisplay({
  tuning,
  tuningStatus,
  currentString,
  isPlaying,
  mode,
  onStringClick,
  detectedNote = null,
  detectedCents = 0,
}: PolytuneDisplayProps) {
  const [blinkState, setBlinkState] = useState(false)

  // Blink effect for active LEDs
  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        setBlinkState((prev) => !prev)
      }, 500)
      return () => clearInterval(intervalId)
    }
  }, [isPlaying])

  // Get note name without octave
  const getNoteName = (note: string) => {
    try {
      return note.slice(0, -1)
    } catch (error) {
      console.error("Error getting note name:", error)
      return note
    }
  }

  // Render the chromatic tuner display
  const renderChromaticDisplay = () => {
    try {
      if (currentString === -1) {
        return (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="text-green-500 text-4xl font-mono mb-4">--</div>
            <div className="text-zinc-500 text-sm">Play a note</div>
          </div>
        )
      }

      const note = detectedNote || tuning[currentString]
      const status = tuningStatus[currentString]
      const noteName = detectedNote ? getNoteName(detectedNote) : getNoteName(note)

      return (
        <div className="flex flex-col items-center justify-center h-40">
          <div className="text-green-500 text-5xl font-mono mb-4">{noteName}</div>

          {/* Cents display */}
          {detectedNote && (
            <div className="text-zinc-400 text-sm mb-2">
              {detectedCents > 0 ? `+${detectedCents}` : detectedCents} cents
            </div>
          )}

          <div className="flex space-x-2 w-64 justify-center">
            {status === "flat" && <div className="text-red-500 text-sm font-bold animate-pulse">▼ FLAT</div>}
            {status === "in-tune" && <div className="text-green-500 text-sm font-bold">IN TUNE</div>}
            {status === "sharp" && <div className="text-red-500 text-sm font-bold animate-pulse">▲ SHARP</div>}
          </div>
        </div>
      )
    } catch (error) {
      console.error("Error rendering chromatic display:", error)
      return (
        <div className="flex flex-col items-center justify-center h-40">
          <div className="text-red-500 text-sm">Display error</div>
        </div>
      )
    }
  }

  // Render the polyphonic tuner display
  const renderPolyDisplay = () => {
    try {
      return (
        <div className="flex flex-col space-y-3 py-4">
          {tuning.map((note, index) => {
            const status = tuningStatus[index]
            const isActive = currentString === index && isPlaying
            const noteName = getNoteName(note)

            return (
              <div
                key={index}
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => onStringClick(index)}
              >
                <div className="w-8 text-right">
                  <span className={cn("text-sm font-mono", isActive ? "text-green-500" : "text-zinc-500")}>
                    {noteName}
                  </span>
                </div>

                <div className="flex-1 h-5 bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden relative">
                  {/* LED indicators */}
                  <div className="absolute inset-0 flex items-center">
                    {/* Flat indicators (left side) */}
                    <div className="flex-1 flex justify-start">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={`flat-${i}`}
                          className={cn(
                            "h-3 w-3 mx-0.5 rounded-full",
                            status === "flat" && i < 5 - Math.abs(currentString - index)
                              ? blinkState && isActive
                                ? "bg-red-600"
                                : "bg-red-500"
                              : "bg-zinc-800",
                          )}
                        ></div>
                      ))}
                    </div>

                    {/* Center (in tune) indicator */}
                    <div
                      className={cn("h-3 w-3 mx-1 rounded-full", status === "in-tune" ? "bg-green-500" : "bg-zinc-800")}
                    ></div>

                    {/* Sharp indicators (right side) */}
                    <div className="flex-1 flex justify-end">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={`sharp-${i}`}
                          className={cn(
                            "h-3 w-3 mx-0.5 rounded-full",
                            status === "sharp" && i < 5 - Math.abs(currentString - index)
                              ? blinkState && isActive
                                ? "bg-red-600"
                                : "bg-red-500"
                              : "bg-zinc-800",
                          )}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Display detected note info in poly mode if available */}
          {detectedNote && (
            <div className="mt-4 pt-4 border-t border-zinc-800 text-center">
              <div className="text-green-500 text-sm">Detected: {detectedNote}</div>
              <div className="text-zinc-400 text-xs">
                {detectedCents > 0 ? `+${detectedCents}` : detectedCents} cents
              </div>
            </div>
          )}
        </div>
      )
    } catch (error) {
      console.error("Error rendering poly display:", error)
      return (
        <div className="flex flex-col items-center justify-center h-40">
          <div className="text-red-500 text-sm">Display error</div>
        </div>
      )
    }
  }

  return (
    <div className="bg-black rounded-sm p-4 border border-zinc-800">
      {mode === "chromatic" ? renderChromaticDisplay() : renderPolyDisplay()}
    </div>
  )
}
