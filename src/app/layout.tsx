import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SvgFilters from "@/components/SvgFilters";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accessibility Mirror — See the web through different eyes",
  description:
    "Instantly visualize how your website is perceived by users with various visual impairments. Build empathy through direct simulation.",
  keywords: [
    "accessibility",
    "a11y",
    "color blindness",
    "vision simulation",
    "web accessibility",
    "WCAG",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SvgFilters />
        {children}
      </body>
    </html>
  );
}
