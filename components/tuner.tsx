"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PolytuneDisplay } from "./polytune-display"
import { Guitar, Music, Mic, MicOff, Volume2, VolumeX } from "lucide-react"
import { PitchDetector } from "./pitch-detector"

// Define instrument tunings
const guitarTunings = {
  standard: ["E2", "A2", "D3", "G3", "B3", "E4"],
  halfStepDown: ["Eb2", "Ab2", "Db3", "Gb3", "Bb3", "Eb4"],
  fullStepDown: ["D2", "G2", "C3", "F3", "A3", "D4"],
  stepAndHalfDown: ["Db2", "Gb2", "B2", "E3", "Ab3", "Db4"],
  dropD: ["D2", "A2", "D3", "G3", "B3", "E4"],
  openG: ["D2", "G2", "D3", "G3", "B3", "D4"],
  openD: ["D2", "A2", "D3", "F#3", "A3", "D4"],
  dadgad: ["D2", "A2", "D3", "G3", "A3", "D4"],
} as const

const bassTunings = {
  standard: ["E1", "A1", "D2", "G2"],
  halfStepDown: ["Eb1", "Ab1", "Db2", "Gb2"],
  fullStepDown: ["D1", "G1", "C2", "F2"],
  stepAndHalfDown: ["Db1", "Gb1", "B1", "E2"],
  dropD: ["D1", "A1", "D2", "G2"],
  fiveString: ["B0", "E1", "A1", "D2", "G2"],
} as const

const ukuleleTunings = {
  standard: ["G4", "C4", "E4", "A4"],
  baritone: ["D3", "G3", "B3", "E4"],
  dADF: ["D4", "A4", "D4", "F4"],
} as const

const banjoTunings = {
  standard: ["G4", "D3", "G3", "B3", "D4"],
  openG: ["G4", "D3", "G3", "B3", "D4"],
  doubleC: ["G4", "C3", "G3", "C4", "D4"],
} as const

const mandolinTunings = {
  standard: ["G3", "D4", "A4", "E5"],
  openG: ["G3", "D4", "G4", "B4"],
  crossTuning: ["A3", "E4", "A4", "E5"],
} as const

const tunings = {
  guitar: guitarTunings,
  bass: bassTunings,
  ukulele: ukuleleTunings,
  banjo: banjoTunings,
  mandolin: mandolinTunings,
} as const

type Instrument = keyof typeof tunings

type TuningOption<T extends Instrument> = keyof (typeof tunings)[T]

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
const findClosestString = (note: string, tuning: readonly string[]): number => {
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
  const [instrument, setInstrument] = useState<Instrument>("guitar")
  const [tuningOption, setTuningOption] = useState<TuningOption<typeof instrument>>("standard")
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

  const stopMicrophone = useCallback(() => {
    try {
      if (microphoneStream.current) {
        microphoneStream.current.getTracks().forEach(track => track.stop())
        microphoneStream.current = null
      }
      setMicrophoneActive(false)
      setDetectedNote(null)
      setDetectedCents(0)
    } catch (error) {
      console.error("Error stopping microphone:", error)
    }
  }, [])

  // Initialize tuning status array based on current instrument/tuning
  useEffect(() => {
    const currentTuning = tunings[instrument as Instrument][tuningOption as TuningOption<typeof instrument>]
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
  }, [stopMicrophone])

  const playTone = (index: number) => {
    try {
      if (isPlaying) {
        stopTone()
      }

      const currentTuning = tunings[instrument as Instrument][tuningOption as TuningOption<typeof instrument>]
      if (index >= currentTuning.length) return

      // Create audio context if it doesn't exist
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
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
    } catch (error) {
      console.error("Error playing tone:", error)
    }
  }

  const stopTone = () => {
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
      setCurrentString(-1)
    } catch (error) {
      console.error("Error stopping tone:", error)
    }
  }

  const startMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      microphoneStream.current = stream
      setMicrophoneActive(true)
    } catch (error) {
      console.error("Error starting microphone:", error)
      setMicrophoneActive(false)
    }
  }

  const handlePitchDetected = (frequency: number) => {
    try {
      const { note, cents } = findClosestNote(frequency, referenceFreq)
      setDetectedNote(note)
      setDetectedCents(cents)

      if (tuningMode === "poly") {
        const currentTuning = tunings[instrument as Instrument][tuningOption as TuningOption<typeof instrument>]
        const stringIndex = findClosestString(note, currentTuning)
        const stringNote = currentTuning[stringIndex]
        const stringFreq = getFrequency(stringNote, referenceFreq)
        const stringCents = Math.round(1200 * Math.log2(frequency / stringFreq))

        const newTuningStatus = [...tuningStatus]
        newTuningStatus[stringIndex] = stringCents < -10 ? "flat" : stringCents > 10 ? "sharp" : "in-tune"
        setTuningStatus(newTuningStatus)
      }
    } catch (error) {
      console.error("Error handling pitch detection:", error)
    }
  }

  const handleReferenceFreqChange = (value: boolean) => {
    setReferenceFreq(value ? 432 : 440)
  }

  const handlePolytuneClick = (index: number) => {
    if (isPlaying && currentString === index) {
      stopTone()
    } else {
      playTone(index)
    }
  }

  const handleTuningModeChange = (value: boolean) => {
    setTuningMode(value ? "chromatic" : "poly")
    setTuningStatus(Array(tunings[instrument as Instrument][tuningOption as TuningOption<typeof instrument>].length).fill("none"))
  }

  const handleInstrumentChange = (value: Instrument) => {
    setInstrument(value)
    setTuningOption("standard")
    setTuningStatus(Array(tunings[value as Instrument].standard.length).fill("none"))
  }

  const handleTuningChange = (value: TuningOption<typeof instrument>) => {
    setTuningOption(value)
    setTuningStatus(Array(tunings[instrument as Instrument][value as TuningOption<typeof instrument>].length).fill("none"))
  }

  const toggleAudioMuted = () => {
    setAudioMuted(!audioMuted)
    if (gainNode.current) {
      gainNode.current.gain.setValueAtTime(audioMuted ? 0.5 : 0, audioContext.current?.currentTime || 0)
    }
  }

  const getTuningOptions = () => {
    return Object.keys(tunings[instrument as Instrument])
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700/50">
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Guitar className="w-5 h-5 text-zinc-400" />
                <Select value={instrument} onValueChange={handleInstrumentChange}>
                  <SelectTrigger className="w-[120px] bg-zinc-800 border-zinc-600 text-zinc-100 hover:bg-zinc-700 hover:border-zinc-500 transition-colors">
                    <SelectValue placeholder="Instrument" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guitar">Guitar</SelectItem>
                    <SelectItem value="bass">Bass</SelectItem>
                    <SelectItem value="ukulele">Ukulele</SelectItem>
                    <SelectItem value="banjo">Banjo</SelectItem>
                    <SelectItem value="mandolin">Mandolin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Music className="w-5 h-5 text-zinc-400" />
                <Select value={tuningOption} onValueChange={handleTuningChange}>
                  <SelectTrigger className="w-[120px] bg-zinc-800 border-zinc-600 text-zinc-100 hover:bg-zinc-700 hover:border-zinc-500 transition-colors">
                    <SelectValue placeholder="Tuning" />
                  </SelectTrigger>
                  <SelectContent>
                    {getTuningOptions().map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1).replace(/([A-Z])/g, " $1")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Label htmlFor="tuning-mode" className="text-zinc-400">
                  Chromatic Mode
                </Label>
                <Switch
                  id="tuning-mode"
                  checked={tuningMode === "chromatic"}
                  onCheckedChange={handleTuningModeChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="reference-freq" className="text-zinc-400">
                  432 Hz
                </Label>
                <Switch
                  id="reference-freq"
                  checked={referenceFreq === 432}
                  onCheckedChange={handleReferenceFreqChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={microphoneActive ? stopMicrophone : startMicrophone}
                className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-600 hover:border-zinc-500 transition-colors"
              >
                {microphoneActive ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    <span className="font-medium">Stop Microphone</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span className="font-medium">Start Microphone</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAudioMuted}
                className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border-zinc-600 hover:border-zinc-500 transition-colors"
              >
                {audioMuted ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span className="font-medium">Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span className="font-medium">Mute</span>
                  </>
                )}
              </Button>
            </div>

            {microphoneActive && (
              <PitchDetector onPitchDetected={handlePitchDetected} />
            )}

            <PolytuneDisplay
              tuning={tunings[instrument as Instrument][tuningOption as TuningOption<typeof instrument>]}
              tuningStatus={tuningStatus}
              currentString={currentString}
              isPlaying={isPlaying}
              mode={tuningMode}
              onStringClick={handlePolytuneClick}
              detectedNote={detectedNote}
              detectedCents={detectedCents}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
