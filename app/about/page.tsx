import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About Poly Tuner | Online Instrument Tuner",
  description:
    "Learn about Poly Tuner, the free online tuner for guitar, bass, ukulele, banjo and mandolin with microphone pitch detection.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-zinc-900">
      <div className="max-w-2xl w-full py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-zinc-100">About Poly Tuner</h1>

        <div className="space-y-6 text-zinc-300">
          <p>
            Poly Tuner is a free online instrument tuner designed to help musicians tune their string instruments with
            precision and ease. Whether you play guitar, bass, ukulele, banjo, or mandolin, Poly Tuner provides accurate
            reference tones and real-time pitch detection.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Support for multiple instruments: guitar, bass, ukulele, banjo, and mandolin</li>
            <li>Standard tunings for all supported instruments</li>
            <li>
              Alternate tunings including 1/2 step down, full step down, 1 1/2 step down, drop D, and open tunings
            </li>
            <li>Microphone pitch detection for hands-free tuning</li>
            <li>Polyphonic view showing all strings simultaneously</li>
            <li>Chromatic mode for precise single-note tuning</li>
            <li>Reference pitch toggle between 440Hz and 432Hz</li>
            <li>Visual LED-style display inspired by professional hardware tuners</li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">How It Works</h2>
          <p>
            Poly Tuner uses the Web Audio API to generate precise reference tones and analyze audio input from your
            microphone. The pitch detection algorithm uses autocorrelation to identify the fundamental frequency of
            played notes, which is then compared to the expected frequencies for your selected instrument and tuning.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">Privacy</h2>
          <p>
            Poly Tuner respects your privacy. When you use the microphone feature, all audio processing happens directly
            in your browser. No audio data is ever sent to our servers or stored anywhere. The microphone is only used
            for pitch detection and is automatically disconnected when you stop the microphone or leave the page.
          </p>

          <div className="flex justify-center mt-12">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/">Try Poly Tuner Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
