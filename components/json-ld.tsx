export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Poly Tuner - Online Instrument Tuner",
    description: "Free online tuner for guitar, bass, ukulele, banjo and mandolin with microphone pitch detection.",
    url: "https://polytuner.vercel.app",
    applicationCategory: "MusicApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Guitar tuning",
      "Bass tuning",
      "Ukulele tuning",
      "Banjo tuning",
      "Mandolin tuning",
      "Standard tunings",
      "Alternate tunings",
      "Microphone pitch detection",
      "Reference tones",
    ],
    screenshot: "https://polytuner.vercel.app/og-image.png",
    softwareVersion: "1.0.0",
    author: {
      "@type": "Organization",
      name: "Poly Tuner",
      url: "https://polytuner.vercel.app",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
