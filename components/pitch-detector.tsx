"use client"

import { useEffect, useRef } from "react"

interface PitchDetectorProps {
  audioContext: AudioContext
  stream: MediaStream
  onPitchDetected: (frequency: number) => void
}

export function PitchDetector({ audioContext, stream, onPitchDetected }: PitchDetectorProps) {
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const bufferRef = useRef<Float32Array | null>(null)
  const bufferLengthRef = useRef<number>(2048)

  useEffect(() => {
    try {
      // Set up audio nodes
      sourceRef.current = audioContext.createMediaStreamSource(stream)
      analyserRef.current = audioContext.createAnalyser()

      // Configure analyzer
      analyserRef.current.fftSize = 2048
      bufferLengthRef.current = analyserRef.current.fftSize
      bufferRef.current = new Float32Array(bufferLengthRef.current)

      // Connect nodes
      sourceRef.current.connect(analyserRef.current)

      // Start pitch detection
      detectPitch()

      return () => {
        // Clean up
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
        }

        if (sourceRef.current) {
          sourceRef.current.disconnect()
        }

        if (analyserRef.current) {
          analyserRef.current.disconnect()
        }
      }
    } catch (error) {
      console.error("Error setting up pitch detector:", error)
    }
  }, [audioContext, stream, onPitchDetected])

  const detectPitch = () => {
    try {
      if (!analyserRef.current || !bufferRef.current) return

      // Get time domain data
      analyserRef.current.getFloatTimeDomainData(bufferRef.current)

      // Use autocorrelation to find the fundamental frequency
      const frequency = findFundamentalFrequency(bufferRef.current, audioContext.sampleRate)

      // If we found a valid frequency, report it
      if (frequency > 30 && frequency < 5000) {
        onPitchDetected(frequency)
      }

      // Continue detection loop
      rafIdRef.current = requestAnimationFrame(detectPitch)
    } catch (error) {
      console.error("Error detecting pitch:", error)
      // Continue detection loop even if there was an error
      rafIdRef.current = requestAnimationFrame(detectPitch)
    }
  }

  // Autocorrelation function to find fundamental frequency
  const findFundamentalFrequency = (buffer: Float32Array, sampleRate: number): number => {
    try {
      // Find the root mean square (RMS) to determine if there's enough signal
      let rms = 0
      for (let i = 0; i < buffer.length; i++) {
        rms += buffer[i] * buffer[i]
      }
      rms = Math.sqrt(rms / buffer.length)

      // If the signal is too quiet, return 0
      if (rms < 0.01) return 0

      // Autocorrelation
      const correlations = new Float32Array(buffer.length / 2)

      for (let lag = 0; lag < correlations.length; lag++) {
        let sum = 0
        for (let i = 0; i < correlations.length; i++) {
          sum += buffer[i] * buffer[i + lag]
        }
        correlations[lag] = sum
      }

      // Find the highest correlation peak after the first low point
      let foundLow = false
      let maxCorrelation = -1
      let maxLag = -1

      for (let lag = 1; lag < correlations.length; lag++) {
        if (!foundLow && correlations[lag] < correlations[lag - 1]) {
          foundLow = true
        }

        if (foundLow && correlations[lag] > correlations[lag - 1]) {
          if (correlations[lag] > maxCorrelation) {
            maxCorrelation = correlations[lag]
            maxLag = lag
          }
        }
      }

      // Calculate frequency from lag
      return maxLag ? sampleRate / maxLag : 0
    } catch (error) {
      console.error("Error finding fundamental frequency:", error)
      return 0
    }
  }

  // This component doesn't render anything visible
  return null
}
