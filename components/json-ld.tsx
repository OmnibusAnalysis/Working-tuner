export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Working Tuner - Online Instrument Tuner",
    description: "Free online tuner for guitar, bass, ukulele, banjo and mandolin with microphone pitch detection.",
    url: "https://workingtuner.com",
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
    screenshot: "https://workingtuner.com/og-image.jpg",
    softwareVersion: "1.0.0",
    author: {
      "@type": "Organization",
      name: "Working Tuner",
      url: "https://workingtuner.com",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
