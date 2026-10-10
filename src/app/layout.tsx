import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CommandPalette } from "@/components/CommandPalette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  // Only the weights actually used in the UI (400/500/600/700).
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  // Only the weights actually used in the UI (400/500/700).
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-pd-rho.vercel.app"),
  title: {
    default: "Shanmukha Varma Penmetsa — VLSI Physical Design Engineer",
    template: "%s | Shanmukha Varma Penmetsa",
  },
  description:
    "VLSI Physical Design Engineer building hands-on expertise in Physical Design and Tcl automation. Currently undergoing intensive training in RTL-to-GDSII flow, timing closure, and EDA automation.",
  keywords: [
    "VLSI",
    "Physical Design",
    "ASIC",
    "RTL-to-GDSII",
    "Timing Closure",
    "Tcl Automation",
    "Cadence Genus",
    "Cadence Innovus",
    "Static Timing Analysis",
  ],
  authors: [{ name: "Shanmukha Varma Penmetsa" }],
  creator: "Shanmukha Varma Penmetsa",
  publisher: "Shanmukha Varma Penmetsa",
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-pd-rho.vercel.app/",
    siteName: "Shanmukha Varma Penmetsa — VLSI Physical Design",
    title: "Shanmukha Varma Penmetsa — VLSI Physical Design Engineer",
    description:
      "VLSI Physical Design Engineer building hands-on expertise in Physical Design and Tcl automation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shanmukha Varma Penmetsa — VLSI Physical Design Engineer",
    description:
      "VLSI Physical Design Engineer building hands-on expertise in Physical Design and Tcl automation.",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050811",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shanmukha Varma Penmetsa",
    jobTitle: "VLSI Physical Design Engineer",
    url: "https://portfolio-pd-rho.vercel.app/",
    sameAs: [
      "https://github.com/shanmukhavarma007",
      "https://www.linkedin.com/in/shanmukhavarma-penmetsa/",
    ],
    knowsAbout: [
      "VLSI Physical Design",
      "ASIC Implementation",
      "RTL-to-GDSII Flow",
      "Timing Closure",
      "Static Timing Analysis",
      "Tcl Automation",
      "Cadence Genus",
      "Cadence Innovus",
      "Physical Verification",
    ],
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      // Next 16 no longer force-sets scroll-behavior to `auto` during SPA route
      // transitions. Restoring that override keeps route changes (e.g. the 404
      // -> /#contact link) instant while in-page anchors stay smoothly animated.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
