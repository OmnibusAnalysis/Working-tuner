"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface InstrumentVisualProps {
  instrument: string
  currentString: number
  isPlaying: boolean
  tuning: string[]
  onStringClick: (index: number) => void
}

export function InstrumentVisual({
  instrument,
  currentString,
  isPlaying,
  tuning,
  onStringClick,
}: InstrumentVisualProps) {
  const [animationFrames, setAnimationFrames] = useState<number[]>(Array(tuning.length).fill(0))

  useEffect(() => {
    if (isPlaying) {
      const intervalId = setInterval(() => {
        setAnimationFrames((prev) => {
          const newFrames = [...prev]
          newFrames[currentString] = (newFrames[currentString] + 1) % 4
          return newFrames
        })
      }, 150)

      return () => clearInterval(intervalId)
    } else {
      setAnimationFrames(Array(tuning.length).fill(0))
    }
  }, [isPlaying, currentString, tuning.length])

  const getInstrumentBody = () => {
    switch (instrument) {
      case "guitar":
        return (
          <svg viewBox="0 0 300 400" className="w-full max-w-md mx-auto">
            {/* Guitar body */}
            <path
              d="M75,150 C50,200 50,300 150,350 C250,300 250,200 225,150 L200,50 L100,50 L75,150"
              fill="#C87137"
              stroke="#8B4513"
              strokeWidth="3"
            />
            {/* Sound hole */}
            <circle cx="150" cy="225" r="30" fill="#4A2511" />
            {/* Neck */}
            <rect x="140" y="50" width="20" height="100" fill="#8B4513" />
            {/* Headstock */}
            <path d="M130,30 L170,30 L170,50 L130,50 Z" fill="#4A2511" />
            {/* Tuning pegs */}
            <circle cx="135" cy="35" r="3" fill="#D4AF37" />
            <circle cx="145" cy="35" r="3" fill="#D4AF37" />
            <circle cx="155" cy="35" r="3" fill="#D4AF37" />
            <circle cx="165" cy="35" r="3" fill="#D4AF37" />
            {/* Bridge */}
            <rect x="125" y="280" width="50" height="10" fill="#4A2511" />

            {/* Strings */}
            {tuning.map((note, index) => {
              const baseY = 150
              const spacing = 10
              const startY = baseY - ((tuning.length - 1) * spacing) / 2 + index * spacing

              // Calculate string vibration effect
              const vibrationOffset =
                isPlaying && currentString === index ? Math.sin((animationFrames[index] * Math.PI) / 2) * 3 : 0

              const stringPath = `M140,${startY + 50} Q${150 + vibrationOffset},${startY + 125} 150,${startY + 200}`

              return (
                <g key={index} onClick={() => onStringClick(index)} className="cursor-pointer">
                  <path
                    d={stringPath}
                    stroke={currentString === index && isPlaying ? "#FFC107" : "#D4D4D4"}
                    strokeWidth={3 - index * 0.3}
                    fill="transparent"
                    className={cn(
                      "transition-colors duration-300",
                      currentString === index && isPlaying ? "filter drop-shadow(0 0 3px #FFC107)" : "",
                    )}
                  />
                  <text
                    x="160"
                    y={startY + 50}
                    fontSize="12"
                    fill={currentString === index && isPlaying ? "#FFC107" : "#FFF"}
                    className="font-bold"
                  >
                    {note}
                  </text>
                </g>
              )
            })}
          </svg>
        )

      case "bass":
        return (
          <svg viewBox="0 0 300 400" className="w-full max-w-md mx-auto">
            {/* Bass body */}
            <path
              d="M75,150 C40,200 40,300 150,370 C260,300 260,200 225,150 L200,50 L100,50 L75,150"
              fill="#8B4513"
              stroke="#4A2511"
              strokeWidth="3"
            />
            {/* Sound hole */}
            <circle cx="150" cy="225" r="25" fill="#4A2511" />
            {/* Neck */}
            <rect x="140" y="50" width="20" height="100" fill="#8B4513" />
            {/* Headstock */}
            <path d="M130,30 L170,30 L170,50 L130,50 Z" fill="#4A2511" />
            {/* Tuning pegs */}
            <circle cx="135" cy="35" r="3" fill="#D4AF37" />
            <circle cx="145" cy="35" r="3" fill="#D4AF37" />
            <circle cx="155" cy="35" r="3" fill="#D4AF37" />
            <circle cx="165" cy="35" r="3" fill="#D4AF37" />
            {/* Bridge */}
            <rect x="125" y="300" width="50" height="15" fill="#4A2511" />

            {/* Strings */}
            {tuning.map((note, index) => {
              const baseY = 150
              const spacing = 12
              const startY = baseY - ((tuning.length - 1) * spacing) / 2 + index * spacing

              // Calculate string vibration effect
              const vibrationOffset =
                isPlaying && currentString === index ? Math.sin((animationFrames[index] * Math.PI) / 2) * 4 : 0

              const stringPath = `M140,${startY + 50} Q${150 + vibrationOffset},${startY + 125} 150,${startY + 200}`

              return (
                <g key={index} onClick={() => onStringClick(index)} className="cursor-pointer">
                  <path
                    d={stringPath}
                    stroke={currentString === index && isPlaying ? "#FFC107" : "#D4D4D4"}
                    strokeWidth={4 - index * 0.5}
                    fill="transparent"
                    className={cn(
                      "transition-colors duration-300",
                      currentString === index && isPlaying ? "filter drop-shadow(0 0 3px #FFC107)" : "",
                    )}
                  />
                  <text
                    x="160"
                    y={startY + 50}
                    fontSize="12"
                    fill={currentString === index && isPlaying ? "#FFC107" : "#FFF"}
                    className="font-bold"
                  >
                    {note}
                  </text>
                </g>
              )
            })}
          </svg>
        )

      case "ukulele":
        return (
          <svg viewBox="0 0 300 400" className="w-full max-w-md mx-auto">
            {/* Ukulele body */}
            <path
              d="M100,150 C80,200 80,250 150,300 C220,250 220,200 200,150 L180,80 L120,80 L100,150"
              fill="#F5DEB3"
              stroke="#D2B48C"
              strokeWidth="3"
            />
            {/* Sound hole */}
            <circle cx="150" cy="200" r="25" fill="#4A2511" />
            {/* Neck */}
            <rect x="140" y="80" width="20" height="70" fill="#D2B48C" />
            {/* Headstock */}
            <path d="M130,50 L170,50 L170,80 L130,80 Z" fill="#8B4513" />
            {/* Tuning pegs */}
            <circle cx="140" cy="60" r="3" fill="#D4AF37" />
            <circle cx="150" cy="60" r="3" fill="#D4AF37" />
            <circle cx="160" cy="60" r="3" fill="#D4AF37" />
            <circle cx="140" cy="70" r="3" fill="#D4AF37" />
            {/* Bridge */}
            <rect x="135" y="250" width="30" height="8" fill="#8B4513" />

            {/* Strings */}
            {tuning.map((note, index) => {
              const baseY = 150
              const spacing = 10
              const startY = baseY - ((tuning.length - 1) * spacing) / 2 + index * spacing

              // Calculate string vibration effect
              const vibrationOffset =
                isPlaying && currentString === index ? Math.sin((animationFrames[index] * Math.PI) / 2) * 3 : 0

              const stringPath = `M140,${startY + 30} Q${150 + vibrationOffset},${startY + 75} 150,${startY + 120}`

              return (
                <g key={index} onClick={() => onStringClick(index)} className="cursor-pointer">
                  <path
                    d={stringPath}
                    stroke={currentString === index && isPlaying ? "#FFC107" : "#A0A0A0"}
                    strokeWidth={2 - index * 0.2}
                    fill="transparent"
                    className={cn(
                      "transition-colors duration-300",
                      currentString === index && isPlaying ? "filter drop-shadow(0 0 3px #FFC107)" : "",
                    )}
                  />
                  <text
                    x="160"
                    y={startY + 30}
                    fontSize="12"
                    fill={currentString === index && isPlaying ? "#FFC107" : "#8B4513"}
                    className="font-bold"
                  >
                    {note}
                  </text>
                </g>
              )
            })}
          </svg>
        )

      case "banjo":
        return (
          <svg viewBox="0 0 300 400" className="w-full max-w-md mx-auto">
            {/* Banjo body (drum) */}
            <circle cx="150" cy="225" r="100" fill="#F5F5DC" stroke="#D2B48C" strokeWidth="5" />
            <circle
              cx="150"
              cy="225"
              r="90"
              fill="transparent"
              stroke="#8B4513"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            {/* Neck */}
            <rect x="145" y="50" width="10" height="175" fill="#8B4513" />
            {/* Headstock */}
            <path d="M135,30 L165,30 L165,50 L135,50 Z" fill="#4A2511" />
            {/* Tuning pegs */}
            <circle cx="140" cy="35" r="3" fill="#D4AF37" />
            <circle cx="150" cy="35" r="3" fill="#D4AF37" />
            <circle cx="160" cy="35" r="3" fill="#D4AF37" />
            <circle cx="140" cy="45" r="3" fill="#D4AF37" />
            <circle cx="160" cy="45" r="3" fill="#D4AF37" />
            {/* Bridge */}
            <rect x="135" y="225" width="30" height="5" fill="#8B4513" />

            {/* Strings */}
            {tuning.map((note, index) => {
              const baseY = 150
              const spacing = 8
              const startY = baseY - ((tuning.length - 1) * spacing) / 2 + index * spacing

              // Calculate string vibration effect
              const vibrationOffset =
                isPlaying && currentString === index ? Math.sin((animationFrames[index] * Math.PI) / 2) * 3 : 0

              const stringPath = `M145,${startY - 50} Q${150 + vibrationOffset},${startY} 150,${startY + 50}`

              return (
                <g key={index} onClick={() => onStringClick(index)} className="cursor-pointer">
                  <path
                    d={stringPath}
                    stroke={currentString === index && isPlaying ? "#FFC107" : "#A0A0A0"}
                    strokeWidth={2 - index * 0.2}
                    fill="transparent"
                    className={cn(
                      "transition-colors duration-300",
                      currentString === index && isPlaying ? "filter drop-shadow(0 0 3px #FFC107)" : "",
                    )}
                  />
                  <text
                    x="160"
                    y={startY - 50}
                    fontSize="12"
                    fill={currentString === index && isPlaying ? "#FFC107" : "#8B4513"}
                    className="font-bold"
                  >
                    {note}
                  </text>
                </g>
              )
            })}
          </svg>
        )

      case "mandolin":
        return (
          <svg viewBox="0 0 300 400" className="w-full max-w-md mx-auto">
            {/* Mandolin body */}
            <path
              d="M100,150 C70,200 70,250 150,320 C230,250 230,200 200,150 L180,80 L120,80 L100,150"
              fill="#CD853F"
              stroke="#8B4513"
              strokeWidth="3"
            />
            {/* Sound holes (f-holes) */}
            <path
              d="M120,200 C125,190 125,210 120,220 M180,200 C175,190 175,210 180,220"
              stroke="#4A2511"
              strokeWidth="3"
              fill="transparent"
            />
            {/* Neck */}
            <rect x="140" y="80" width="20" height="70" fill="#8B4513" />
            {/* Headstock */}
            <path d="M130,50 L170,50 L170,80 L130,80 Z" fill="#4A2511" />
            {/* Tuning pegs */}
            <circle cx="135" cy="55" r="3" fill="#D4AF37" />
            <circle cx="135" cy="65" r="3" fill="#D4AF37" />
            <circle cx="135" cy="75" r="3" fill="#D4AF37" />
            <circle cx="165" cy="55" r="3" fill="#D4AF37" />
            <circle cx="165" cy="65" r="3" fill="#D4AF37" />
            <circle cx="165" cy="75" r="3" fill="#D4AF37" />
            {/* Bridge */}
            <rect x="135" y="230" width="30" height="8" fill="#4A2511" />

            {/* Strings */}
            {tuning.map((note, index) => {
              const baseY = 150
              const spacing = 10
              const startY = baseY - ((tuning.length - 1) * spacing) / 2 + index * spacing

              // Calculate string vibration effect
              const vibrationOffset =
                isPlaying && currentString === index ? Math.sin((animationFrames[index] * Math.PI) / 2) * 3 : 0

              const stringPath = `M140,${startY + 30} Q${150 + vibrationOffset},${startY + 75} 150,${startY + 120}`

              return (
                <g key={index} onClick={() => onStringClick(index)} className="cursor-pointer">
                  <path
                    d={stringPath}
                    stroke={currentString === index && isPlaying ? "#FFC107" : "#A0A0A0"}
                    strokeWidth={2 - index * 0.2}
                    fill="transparent"
                    className={cn(
                      "transition-colors duration-300",
                      currentString === index && isPlaying ? "filter drop-shadow(0 0 3px #FFC107)" : "",
                    )}
                  />
                  <text
                    x="160"
                    y={startY + 30}
                    fontSize="12"
                    fill={currentString === index && isPlaying ? "#FFC107" : "#8B4513"}
                    className="font-bold"
                  >
                    {note}
                  </text>
                </g>
              )
            })}
          </svg>
        )

      default:
        return (
          <div className="flex justify-center items-center h-64 text-zinc-400">
            <p>Select an instrument</p>
          </div>
        )
    }
  }

  return (
    <div className="bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg p-4 shadow-inner">
      <div className="relative">
        {getInstrumentBody()}
        <div className="absolute bottom-2 right-2 text-xs text-zinc-500 dark:text-zinc-400">
          Click on strings to play
        </div>
      </div>
    </div>
  )
}
