"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Dynamically import the Tuner component with no SSR
const TunerComponent = dynamic(() => import("./tuner-component"), {
  ssr: false,
  loading: () => <p className="text-center text-zinc-400">Loading tuner...</p>,
})

export function ClientTunerWrapper() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <p className="text-center text-zinc-400">Loading tuner...</p>
  }

  return <TunerComponent />
}
