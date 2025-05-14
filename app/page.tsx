import { Tuner } from "@/components/tuner"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-900">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-zinc-100">Poly Tuner</h1>
        <p className="text-center mb-8 text-zinc-400">Guitar, Bass, Ukulele, Banjo & Mandolin</p>
        <Tuner />
        <p className="text-center mt-4 text-xs text-zinc-500">
          Click "Start Microphone" to enable automatic tuning detection
        </p>
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-zinc-200 mb-2">About Poly Tuner</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Poly Tuner is a free online instrument tuner that supports guitar, bass, ukulele, banjo, and mandolin. It
            features standard tunings, alternate tunings like 1/2 step down, full step down, and 1 1/2 step down, as
            well as open tunings. The tuner offers both reference tones and microphone pitch detection for accurate
            tuning.
          </p>
          <h2 className="text-xl font-semibold text-zinc-200 mb-2">How to Use</h2>
          <ol className="text-zinc-400 text-sm list-decimal list-inside space-y-1 text-left max-w-sm mx-auto">
            <li>Select your instrument and preferred tuning</li>
            <li>Click "Start Microphone" to enable pitch detection</li>
            <li>Play a string on your instrument</li>
            <li>The tuner will show if the string is flat, in tune, or sharp</li>
            <li>Adjust your string until the center green LED lights up</li>
          </ol>
        </div>
      </div>
    </main>
  )
}
