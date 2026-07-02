import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

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
  metadataBase: new URL("https://stalessandro.edu"),
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "St Alessandro University Institute",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-surface-muted text-fg-primary antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
