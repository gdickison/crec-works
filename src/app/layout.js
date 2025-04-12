import { Inter } from "next/font/google";
import {
  ClerkProvider
} from '@clerk/nextjs'
import "./globals.css";
import Header from "@/components/Header";
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Church Works",
  description: "My Church Works is a business directory for members of CREC churches.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
          />
        </head>
        <body className={`${inter.className} relative`}>
          <Header />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
