"use client"

import { useState } from "react"
import { X, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { setAnalyticsConsent } from "@/lib/analytics"

interface AnalyticsBannerProps {
  onClose: () => void
}

export function AnalyticsBanner({ onClose }: AnalyticsBannerProps) {
  const [consent, setConsent] = useState<boolean | null>(null)

  const handleConsent = (consented: boolean) => {
    setAnalyticsConsent(consented)
    setConsent(consented)
    setTimeout(onClose, 2000)
  }

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 mb-4 relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-200" aria-label="Close">
        <X size={16} />
      </button>

      <div className="flex items-start">
        <BarChart className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
        <div>
          <h3 className="text-sm font-medium text-zinc-200">Analytics Consent</h3>
          <p className="text-xs text-zinc-400 mt-1 mb-3">
            We collect anonymous usage data to improve the tuner. No personal information is collected. You can opt out
            at any time in the privacy settings.
          </p>

          {consent === null ? (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-xs py-1 h-auto" onClick={() => handleConsent(false)}>
                Opt Out
              </Button>
              <Button
                size="sm"
                className="text-xs py-1 h-auto bg-green-600 hover:bg-green-700"
                onClick={() => handleConsent(true)}
              >
                Allow Analytics
              </Button>
            </div>
          ) : (
            <p className="text-xs text-green-500">
              {consent
                ? "Thank you! Your preference has been saved."
                : "You've opted out. No analytics will be collected."}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
