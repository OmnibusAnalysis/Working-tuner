import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/react";
import { JsonLd } from "@/components/json-ld";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Working Tuner",
    template: "%s | Working Tuner"
  },
  description: "A professional tuner application for musicians and audio engineers. Tune your instruments with precision and ease.",
  keywords: ["tuner", "music", "audio", "instrument tuning", "professional tuner", "musician tools"],
  authors: [{ name: "Working Tuner Team" }],
  creator: "Working Tuner",
  publisher: "Working Tuner",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://workingtuner.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Working Tuner",
    description: "A professional tuner application for musicians and audio engineers",
    url: 'https://workingtuner.com',
    siteName: 'Working Tuner',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Working Tuner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Working Tuner",
    description: "A professional tuner application for musicians and audio engineers",
    images: ['/og-image.jpg'],
    creator: '@workingtuner',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification completed via DNS verification
    // DNS verification doesn't require a meta tag code in the HTML
    google: '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
