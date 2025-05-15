import { Tuner } from "@/components/tuner"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-zinc-900 pt-24 pb-12 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2 text-zinc-100">Poly Tuner</h1>
        <p className="text-center mb-8 text-zinc-400">Guitar, Bass, Ukulele, Banjo & Mandolin</p>
        <Tuner />
        <p className="text-center mt-4 text-xs text-zinc-500">
          Click &quot;Start Microphone&quot; to enable automatic tuning detection
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
            <li>Click &quot;Start Microphone&quot; to enable pitch detection</li>
            <li>Play a string on your instrument</li>
            <li>The tuner will show if the string is flat, in tune, or sharp</li>
            <li>Adjust your string until the center green LED lights up</li>
          </ol>
          <div className="mt-8 border-t border-zinc-800 pt-6">
            <p className="text-zinc-400 text-sm mb-3"> This was created after endless frustration searching for a guitar tuner that was easy to use with an insturment in your hand. Find this tuner useful? Help support it. It is developed and maintained by your contributions.</p>
            <a
              href="https://www.buymeacoffee.com/spudpug"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.5 3.5H3.5C2.67 3.5 2 4.17 2 5v14c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5V5c0-.83-.67-1.5-1.5-1.5zm-1.5 14h-14V5h14v12.5z" />
                <path d="M7 7h10v2H7zM7 11h10v2H7zM7 15h7v2H7z" />
              </svg>
              Buy me a coffee
            </a>
          </div>
          <div className="mt-8 border-t border-zinc-800 pt-6">
            <h2 className="text-xl font-semibold text-zinc-200 mb-4">Contact Us</h2>
            <p className="text-zinc-400 text-sm mb-6">
              Have questions or feedback? Have an idea for a feature? Click the &quot;Contact&quot; link at the top of the
              page and send us a message. We will get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-zinc-800">
        <p className="text-center text-zinc-500 text-sm">
          © {new Date().getFullYear()} SpudPug Development. All rights reserved.
        </p>
      </div>
    </main>
  )
}
