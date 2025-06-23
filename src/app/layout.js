import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Move viewport here
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata = {
  title: "MultiNet Velocity | Fastest Fiber Internet in Cabanatuan",
  description:
    "Experience blazing-fast fiber internet in Cabanatuan with FREE installation and up to 90 premium TV channels. Cheaper, faster, and more reliable than other ISPs.",
  keywords: [
    "Fiber Internet Cabanatuan",
    "Affordable Internet Cabanatuan",
    "High-Speed Internet Philippines",
    "Free TV Channels Internet",
    "Fiber Optic Plans Cabanatuan",
    "MultiNet Velocity"
  ],
  metadataBase: new URL("https://multinetworkcatv.com"),
  // ✅ Add favicon to metadata
  icons: {
    icon: "/MultinetLogo4.svg",
    shortcut: "/MultinetLogo4.svg",
    apple: "/MultinetLogo4.svg",
  },
  openGraph: {
    title: "MultiNet Velocity | Fastest Fiber Internet in Cabanatuan",
    description:
      "Get up to 750 Mbps fiber internet in Cabanatuan with FREE TV channels and installation.",
    url: "https://multinetworkcatv.com",
    siteName: "MultiNet Velocity",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: "MultiNet Velocity - Fiber Internet Cabanatuan",
      },
    ],
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "MultiNet Velocity | Fiber Internet Cabanatuan",
    description:
      "Affordable 750 Mbps fiber internet with free TV channels and installation.",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  themeColor: "#7C4DC1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Structured Data with Full Business Info */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "InternetProvider",
              name: "MultiNet Velocity",
              url: "https://multinetworkcatv.com/",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Purok Mampulog, Brgy. Bitas",
                addressLocality: "Cabanatuan City",
                addressRegion: "Nueva Ecija",
                postalCode: "3100",
                addressCountry: "PH"
              },
              areaServed: "Cabanatuan City",
              serviceType: "Fiber Optic Internet",
              telephone: [
                "(044) 463 8301",
                "+639335088895",
                "+639503964228",
                "+639852751154",
                "+639384618920"
              ]
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}