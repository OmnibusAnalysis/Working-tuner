import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Privacy Policy | Poly Tuner",
  description:
    "Privacy policy for Poly Tuner, the free online instrument tuner. Learn how we handle your data and protect your privacy.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 bg-zinc-900">
      <div className="max-w-2xl w-full py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-zinc-100">Privacy Policy</h1>

        <div className="space-y-6 text-zinc-300">
          <p>
            <strong>Last Updated:</strong> May 12, 2024
          </p>

          <p>
            At Poly Tuner, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect
            your information when you use our online instrument tuner.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">Information We Collect</h2>
          <p>
            <strong>Microphone Access:</strong> When you use the microphone feature for pitch detection, we access your
            device's microphone only with your explicit permission. All audio processing happens directly in your
            browser. We do not record, store, or transmit any audio data to our servers.
          </p>

          <p>
            <strong>Usage Data:</strong> We collect anonymous usage data such as which instruments and tunings are most
            popular. This data is aggregated and cannot be used to identify individual users. The analytics we collect
            include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Instrument and tuning selections</li>
            <li>Feature usage (microphone, reference tones, etc.)</li>
            <li>Session duration and frequency</li>
            <li>Device type and browser information</li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">Analytics Opt-Out</h2>
          <p>
            You can opt out of analytics collection at any time. When you first visit Poly Tuner, you'll be asked for
            your consent to collect anonymous usage data. If you choose to opt out, no analytics data will be collected
            during your sessions. You can change your preference at any time in the application settings.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Provide and improve the Poly Tuner service</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Identify popular features and prioritize development</li>
            <li>Fix bugs and troubleshoot issues</li>
          </ul>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">Cookies</h2>
          <p>
            Poly Tuner uses cookies to remember your preferences, such as your selected instrument, tuning, and
            reference frequency. These cookies are stored locally on your device and are not used for tracking or
            advertising purposes.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">Third-Party Services</h2>
          <p>
            We use Vercel Analytics for collecting anonymous usage data. Vercel Analytics is privacy-focused and does
            not use cookies or collect personally identifiable information. For more information, please see{" "}
            <a href="https://vercel.com/docs/analytics" className="text-green-500 hover:underline">
              Vercel's Analytics documentation
            </a>
            .
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100 mt-8">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@polytuner.vercel.app.</p>

          <div className="flex justify-center mt-12">
            <Button asChild variant="outline">
              <Link href="/">Return to Tuner</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
