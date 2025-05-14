"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PolytuneDisplay } from "./polytune-display"
import { Guitar, Music, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { PitchDetector } from "./pitch-detector"

// Define instrument tunings
const tunings = {
  guitar: {
    standard: ["E2", "A2", "D3", "G3", "B3", "E4"],
    halfStepDown: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"],
    fullStepDown: ["D2", "G2", "C3", "F3", "A3", "D4"],
    stepAndHalfDown: ["Db2", "Gb2", "B2", "E3", "Ab3", "Db4"],
    dropD: ["D2", "A2", "D3", "G3", "B3", "E4"],
    openG: ["D2", "G2", "D3", "G3", "B3", "D4"],
    openD: ["D2", "A2", "D3", "F#3", "A3", "D4"],
    dadgad: ["D2", "A2", "D3", "G3", "A3", "D4"],
  },
  bass: {
    standard: ["E1", "A1", "D2", "G2"],
    halfStepDown: ["Eb1", "Ab1", "Db2", "Gb2"],
    fullStepDown: ["D1", "G1", "C2", "F2"],
    stepAndHalfDown: ["Db1", "Gb1", "B1", "E2"],
    dropD: ["D1", "A1", "D2", "G2"],
    fiveString: ["B0", "E1", "A1", "D2", "G2"],
  },
  ukulele: {
    standard: ["G4", "C4", "E4", "A4"],
    baritone: ["D3", "G3", "B3", "E4"],
    dADF: ["D4", "A4", "D4", "F4"],
  },
  banjo: {
    standard: ["G4", "D3", "G3", "B3", "D4"],
    openG: ["G4", "D3", "G3", "B3", "D4"],
    doubleC: ["G4", "C3", "G3", "C4", "D4"],
  },
  mandolin: {
    standard: ["G3", "D4", "A4", "E5"],
    openG: ["G3", "D4", "G4", "B4"],
    crossTuning: ["A3", "E4", "A4", "E5"],
  },
}

// Note frequencies in Hz (A4 = 440Hz as reference)
const getFrequency = (note: string, referenceFreq = 440): number => {
  try {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    // Parse the note and octave
    const noteName = note.slice(0, -1)
    const octave = Number.parseInt(note.slice(-1), 10)

    // Calculate semitones from A4
    const noteIndex = notes.indexOf(noteName)
    const a4Index = notes.indexOf("A")

    const semitonesFromA4 = (octave - 4) * 12 + (noteIndex - a4Index)

    // Calculate frequency using the formula: f = referenceFreq * 2^(n/12)
    return referenceFreq * Math.pow(2, semitonesFromA4 / 12)
  } catch (error) {
    console.error("Error calculating frequency:", error)
    return 440 // Default to A4 if there's an error
  }
}

// Find the closest note to a given frequency
const findClosestNote = (frequency: number, referenceFreq = 440): { note: string; cents: number } => {
  try {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

    // Calculate how many semitones from A4
    const semitonesFromA4 = Math.round(12 * Math.log2(frequency / referenceFreq))

    // Calculate the octave and note index
    const octave = Math.floor(semitonesFromA4 / 12) + 4
    const noteIndex = ((semitonesFromA4 % 12) + 12) % 12

    // Calculate cents deviation
    const exactSemitones = 12 * Math.log2(frequency / referenceFreq)
    const cents = Math.round((exactSemitones - semitonesFromA4) * 100)

    return {
      note: `${notes[(noteIndex + 3) % 12]}${octave}`,
      cents: cents,
    }
  } catch (error) {
    console.error("Error finding closest note:", error)
    return { note: "A4", cents: 0 } // Default to A4 if there's an error
  }
}

// Find the closest string to a given note
const findClosestString = (note: string, tuning: string[]): number => {
  try {
    const noteFreq = getFrequency(note)

    let closestIndex = 0
    let minDifference = Number.POSITIVE_INFINITY

    tuning.forEach((stringNote, index) => {
      const stringFreq = getFrequency(stringNote)
      const difference = Math.abs(Math.log2(noteFreq / stringFreq))

      if (difference < minDifference) {
        minDifference = difference
        closestIndex = index
      }
    })

    return closestIndex
  } catch (error) {
    console.error("Error finding closest string:", error)
    return 0 // Default to first string if there's an error
  }
}

export function Tuner() {
  const [instrument, setInstrument] = useState("guitar")
  const [tuningOption, setTuningOption] = useState("standard")
  const [referenceFreq, setReferenceFreq] = useState(440)
  const [currentString, setCurrentString] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [tuningMode, setTuningMode] = useState<"poly" | "chromatic">("poly")
  const [tuningStatus, setTuningStatus] = useState<("flat" | "in-tune" | "sharp" | "none")[]>([])
  const [microphoneActive, setMicrophoneActive] = useState(false)
  const [detectedNote, setDetectedNote] = useState<string | null>(null)
  const [detectedCents, setDetectedCents] = useState<number>(0)
  const [audioMuted, setAudioMuted] = useState(false)
  const audioContext = useRef<AudioContext | null>(null)
  const oscillator = useRef<OscillatorNode | null>(null)
  const gainNode = useRef<GainNode | null>(null)
  const microphoneStream = useRef<MediaStream | null>(null)

  // Initialize tuning status array based on current instrument/tuning
  useEffect(() => {
    const currentTuning = tunings[instrument as keyof typeof tunings][tuningOption as keyof typeof tunings.guitar]
    setTuningStatus(Array(currentTuning.length).fill("none"))
  }, [instrument, tuningOption])

  // Cleanup audio resources
  useEffect(() => {
    return () => {
      try {
        if (oscillator.current) {
          oscillator.current.stop()
          oscillator.current.disconnect()
        }
        if (gainNode.current) {
          gainNode.current.disconnect()
        }
        stopMicrophone()
      } catch (error) {
        console.error("Error cleaning up audio resources:", error)
      }
    }
  }, [])

  const playTone = (index: number) => {
    try {
      if (isPlaying) {
        stopTone()
      }

      const currentTuning = tunings[instrument as keyof typeof tunings][tuningOption as keyof typeof tunings.guitar]
      if (index >= currentTuning.length) return

      // Create audio context if it doesn't exist
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      // Calculate frequency based on note and reference frequency
      const frequency = getFrequency(currentTuning[index], referenceFreq)

      // Create oscillator and gain node
      oscillator.current = audioContext.current.createOscillator()
      gainNode.current = audioContext.current.createGain()

      // Configure oscillator
      oscillator.current.type = "sine"
      oscillator.current.frequency.setValueAtTime(frequency, audioContext.current.currentTime)

      // Apply volume
      gainNode.current.gain.setValueAtTime(0, audioContext.current.currentTime)
      gainNode.current.gain.linearRampToValueAtTime(audioMuted ? 0 : 0.5, audioContext.current.currentTime + 0.1)

      // Connect nodes
      oscillator.current.connect(gainNode.current)
      gainNode.current.connect(audioContext.current.destination)

      // Start oscillator
      oscillator.current.start()
      setIsPlaying(true)
      setCurrentString(index)

      // Set this string as in-tune for reference
      const newStatus = Array(currentTuning.length).fill("none") as ("flat" | "in-tune" | "sharp" | "none")[]
      newStatus[index] = "in-tune"
      setTuningStatus(newStatus)
    } catch (error) {
      console.error("Error playing tone:", error)
      // Reset state in case of error
      setIsPlaying(false)
      setCurrentString(-1)
    }
  }

  const stopTone = () => {
    try {
      if (!oscillator.current || !gainNode.current || !audioContext.current) return

      // Apply fade out
      gainNode.current.gain.linearRampToValueAtTime(0, audioContext.current.currentTime + 0.1)

      // Stop oscillator after fade out
      setTimeout(() => {
        try {
          if (oscillator.current) {
            oscillator.current.stop()
            oscillator.current.disconnect()
            oscillator.current = null
          }
          if (gainNode.current) {
            gainNode.current.disconnect()
            gainNode.current = null
          }
          setIsPlaying(false)
          if (!microphoneActive) {
            setCurrentString(-1)
            setTuningStatus(Array(tuningStatus.length).fill("none"))
          }
        } catch (error) {
          console.error("Error stopping tone:", error)
          // Force reset state in case of error
          setIsPlaying(false)
          setCurrentString(-1)
        }
      }, 100)
    } catch (error) {
      console.error("Error stopping tone:", error)
      // Force reset state in case of error
      setIsPlaying(false)
      setCurrentString(-1)
    }
  }

  const startMicrophone = async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      microphoneStream.current = stream

      // Create audio context if it doesn't exist
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      setMicrophoneActive(true)

      // Stop any playing tone
      if (isPlaying) {
        stopTone()
      }
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Could not access microphone. Please check permissions and try again.")
      setMicrophoneActive(false)
    }
  }

  const stopMicrophone = () => {
    try {
      if (microphoneStream.current) {
        microphoneStream.current.getTracks().forEach((track) => track.stop())
        microphoneStream.current = null
      }
      setMicrophoneActive(false)
      setDetectedNote(null)
      setDetectedCents(0)
      setCurrentString(-1)
      setTuningStatus(Array(tuningStatus.length).fill("none"))
    } catch (error) {
      console.error("Error stopping microphone:", error)
      // Force reset state in case of error
      setMicrophoneActive(false)
      setDetectedNote(null)
      setDetectedCents(0)
    }
  }

  const handlePitchDetected = (frequency: number) => {
    try {
      if (!microphoneActive) return

      const { note, cents } = findClosestNote(frequency, referenceFreq)
      setDetectedNote(note)
      setDetectedCents(cents)

      // Find the closest string to the detected note
      const currentTuning = tunings[instrument as keyof typeof tunings][tuningOption as keyof typeof tunings.guitar]
      const stringIndex = findClosestString(note, currentTuning)
      setCurrentString(stringIndex)

      // Determine if the note is flat, in-tune, or sharp
      const targetFreq = getFrequency(currentTuning[stringIndex], referenceFreq)
      const detectedFreq = frequency
      const ratio = detectedFreq / targetFreq

      const newStatus = Array(currentTuning.length).fill("none") as ("flat" | "in-tune" | "sharp" | "none")[]

      if (Math.abs(cents) < 10) {
        newStatus[stringIndex] = "in-tune"
      } else if (ratio < 1) {
        newStatus[stringIndex] = "flat"
      } else {
        newStatus[stringIndex] = "sharp"
      }

      setTuningStatus(newStatus)
    } catch (error) {
      console.error("Error handling pitch detection:", error)
    }
  }

  const handleReferenceFreqChange = (value: boolean) => {
    try {
      const newFreq = value ? 432 : 440
      setReferenceFreq(newFreq)

      // If currently playing, restart with new frequency
      if (isPlaying && currentString >= 0) {
        stopTone()
        setTimeout(() => playTone(currentString), 100)
      }
    } catch (error) {
      console.error("Error changing reference frequency:", error)
    }
  }

  const handlePolytuneClick = (index: number) => {
    try {
      if (microphoneActive) {
        // If microphone is active, don't play tones on click
        return
      }

      if (currentString === index && isPlaying) {
        stopTone()
      } else {
        playTone(index)
      }
    } catch (error) {
      console.error("Error handling polytune click:", error)
    }
  }

  const handleTuningModeChange = (value: boolean) => {
    try {
      const newMode = value ? "chromatic" : "poly"
      setTuningMode(newMode)
    } catch (error) {
      console.error("Error changing tuning mode:", error)
    }
  }

  const handleInstrumentChange = (value: string) => {
    try {
      setInstrument(value)
      setTuningOption("standard")
      stopTone()
    } catch (error) {
      console.error("Error changing instrument:", error)
    }
  }

  const handleTuningChange = (value: string) => {
    try {
      setTuningOption(value)
      stopTone()
    } catch (error) {
      console.error("Error changing tuning:", error)
    }
  }

  const toggleAudioMuted = () => {
    try {
      const newMuted = !audioMuted
      setAudioMuted(newMuted)

      // Update gain if currently playing
      if (isPlaying && gainNode.current && audioContext.current) {
        gainNode.current.gain.linearRampToValueAtTime(newMuted ? 0 : 0.5, audioContext.current.currentTime + 0.1)
      }
    } catch (error) {
      console.error("Error toggling audio mute:", error)
    }
  }

  const simulateStrum = () => {
    try {
      // Simulate all strings being in tune
      const currentTuning = tunings[instrument as keyof typeof tunings][tuningOption as keyof typeof tunings.guitar]
      setTuningStatus(Array(currentTuning.length).fill("in-tune"))
      setTimeout(() => {
        setTuningStatus(Array(currentTuning.length).fill("none"))
      }, 2000)
    } catch (error) {
      console.error("Error simulating strum:", error)
    }
  }

  const getTuningOptions = () => {
    try {
      const options = Object.keys(tunings[instrument as keyof typeof tunings])
      return options.map((option) => (
        <SelectItem key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1).replace(/([A-Z])/g, " $1")}
        </SelectItem>
      ))
    } catch (error) {
      console.error("Error getting tuning options:", error)
      return null
    }
  }

  return (
    <Card className="border-none bg-zinc-800 shadow-xl overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-zinc-900 p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="w-full sm:w-1/2">
              <Label htmlFor="instrument-select" className="mb-2 block text-zinc-400 text-xs uppercase tracking-wider">
                Instrument
              </Label>
              <Select value={instrument} onValueChange={handleInstrumentChange}>
                <SelectTrigger id="instrument-select" className="w-full bg-zinc-800 border-zinc-700 text-zinc-200">
                  <div className="flex items-center gap-2">
                    <Guitar className="h-4 w-4 text-green-500" />
                    <SelectValue placeholder="Select instrument" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                  <SelectItem value="guitar">Guitar</SelectItem>
                  <SelectItem value="bass">Bass</SelectItem>
                  <SelectItem value="ukulele">Ukulele</SelectItem>
                  <SelectItem value="banjo">Banjo</SelectItem>
                  <SelectItem value="mandolin">Mandolin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-1/2">
              <Label htmlFor="tuning-select" className="mb-2 block text-zinc-400 text-xs uppercase tracking-wider">
                Tuning
              </Label>
              <Select value={tuningOption} onValueChange={handleTuningChange}>
                <SelectTrigger id="tuning-select" className="w-full bg-zinc-800 border-zinc-700 text-zinc-200">
                  <SelectValue placeholder="Select tuning" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                  {getTuningOptions()}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="p-6 bg-black">
          <PolytuneDisplay
            tuning={tunings[instrument as keyof typeof tunings][tuningOption as keyof typeof tunings.guitar]}
            tuningStatus={tuningStatus}
            currentString={currentString}
            isPlaying={isPlaying || microphoneActive}
            mode={tuningMode}
            onStringClick={handlePolytuneClick}
            detectedNote={detectedNote}
            detectedCents={detectedCents}
          />
        </div>

        <div className="p-4 bg-zinc-900 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="tuning-mode" className="text-xs text-zinc-400 uppercase tracking-wider">
                Mode:
              </Label>
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${tuningMode === "poly" ? "text-green-500 font-bold" : "text-zinc-400"}`}>
                  POLY
                </span>
                <Switch
                  id="tuning-mode"
                  checked={tuningMode === "chromatic"}
                  onCheckedChange={handleTuningModeChange}
                  className="data-[state=checked]:bg-green-500"
                />
                <span
                  className={`text-xs ${tuningMode === "chromatic" ? "text-green-500 font-bold" : "text-zinc-400"}`}
                >
                  CHROM
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Label htmlFor="reference-freq" className="text-xs text-zinc-400 uppercase tracking-wider">
                Ref:
              </Label>
              <div className="flex items-center space-x-2">
                <span className={`text-xs ${referenceFreq === 440 ? "text-green-500 font-bold" : "text-zinc-400"}`}>
                  440Hz
                </span>
                <Switch
                  id="reference-freq"
                  checked={referenceFreq === 432}
                  onCheckedChange={handleReferenceFreqChange}
                  className="data-[state=checked]:bg-green-500"
                />
                <span className={`text-xs ${referenceFreq === 432 ? "text-green-500 font-bold" : "text-zinc-400"}`}>
                  432Hz
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-zinc-800 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={microphoneActive ? stopMicrophone : startMicrophone}
            className={`text-xs ${
              microphoneActive
                ? "bg-green-500/20 text-green-500 border-green-500 hover:bg-green-500/30"
                : "text-zinc-300 border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100"
            }`}
          >
            {microphoneActive ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Microphone
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Start Microphone
              </>
            )}
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAudioMuted}
              className="text-xs text-zinc-300 border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100"
            >
              {audioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={simulateStrum}
              className="text-xs text-zinc-300 border-zinc-600 hover:bg-zinc-700 hover:text-zinc-100"
              disabled={microphoneActive}
            >
              <Music className="h-4 w-4 mr-2" />
              Simulate Strum
            </Button>
          </div>
        </div>

        {microphoneStream.current && audioContext.current && (
          <PitchDetector
            audioContext={audioContext.current}
            stream={microphoneStream.current}
            onPitchDetected={handlePitchDetected}
          />
        )}
      </CardContent>
    </Card>
  )
}
