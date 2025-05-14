"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Guitar, Music } from "lucide-react"

export default function TunerComponent() {
  const [instrument, setInstrument] = useState("guitar")

  return (
    <Card className="border-none bg-zinc-800 shadow-xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          <Guitar className="h-12 w-12 text-green-500" />
          <h2 className="text-xl font-bold text-zinc-100">Basic Tuner</h2>
          <p className="text-zinc-400 text-center">This is a simplified version of the tuner to fix loading issues.</p>
          <Button
            className="mt-4 bg-green-600 hover:bg-green-700"
            onClick={() => alert("Tuner functionality will be added back soon!")}
          >
            <Music className="h-4 w-4 mr-2" />
            Play Reference Tone
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
