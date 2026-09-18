import type { Metadata } from "next";
import { Barlow, Noto_Serif_Display, Unbounded } from "next/font/google";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoSerif = Noto_Serif_Display({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Atlas Digital Group | Digital Growth Agency | Web Development & Marketing",
  description: "Atlas Digital Group helps businesses scale with high-performing websites, strategic digital marketing, automation, and virtual support solutions.",
  metadataBase: new URL("https://www.atlasdigitalgroup.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    locale: "en_US",
    type: "website",
    title: "Atlas Digital Group | Digital Growth Agency",
    description: "Atlas Digital Group helps businesses scale with high-performing websites, strategic digital marketing, automation, and virtual support solutions.",
    url: "https://www.atlasdigitalgroup.com/",
    siteName: "Atlas Digital Group",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Atlas Digital Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas Digital Group | Digital Growth Agency",
    description: "Atlas Digital Group helps businesses scale with high-performing websites, strategic digital marketing, automation, and virtual support solutions.",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-192x192.png", sizes: "192x192" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${barlow.variable} ${notoSerif.variable} ${unbounded.variable} antialiased font-barlow`}
      >
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
