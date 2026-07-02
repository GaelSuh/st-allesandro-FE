import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const SITE_URL = `https://${BRAND.website}`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "St Alessandro University Institute — Empowering minds, Inspiring excellence",
    template: "%s · St Alessandro University Institute",
  },
  description:
    "A premier nursing and health-sciences university institute in Bonaberi-Douala. Empowering minds, inspiring excellence, innovating knowledge, shaping tomorrow.",
  keywords: [
    "St Alessandro University Institute",
    "nursing school Cameroon",
    "Douala university",
    "clinical training",
    "health sciences",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/logo/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/logo/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "St Alessandro University Institute",
    url: SITE_URL,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1426" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Organization structured data — this is what lets Google associate the SAU
// crest with the site in search results / the Knowledge Panel, independent of
// the favicon. See https://developers.google.com/search/docs/appearance/structured-data/logo
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollegeOrUniversity",
  name: BRAND.name,
  alternateName: BRAND.abbreviation,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/crest-512.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  description:
    "A premier nursing and health-sciences university institute in Bonaberi-Douala, Cameroon.",
  address: {
    "@type": "PostalAddress",
    streetAddress: BRAND.location.address,
    addressLocality: BRAND.location.city,
    addressCountry: "CM",
  },
  telephone: BRAND.contact.phone,
  email: BRAND.contact.email,
  sameAs: Object.values(BRAND.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-surface-muted text-fg-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
