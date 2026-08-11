import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "መኪና ለሽያጭ አዲስ አበባ | Cars for Sale Ethiopia 2026 | BEKI AUTOCAR – Toyota BYD Land Cruiser SUV Addis Ababa",
  description: "Ethiopia's #1 luxury and exotic car brokerage in Addis Ababa. Buy & sell Toyota Land Cruiser, Hilux, BYD, Mercedes, BMW and premium SUVs. Sourcing pristine vehicles from Japan, UAE, and Europe. Commission-free service.",
  keywords: ["Cars Ethiopia", "Mekina Ethiopia", "Addis Ababa Cars", "Used Cars Ethiopia", "Toyota Ethiopia", "Land Cruiser Ethiopia", "BYD Ethiopia", "Electric Car Ethiopia", "Beki AutoCar"],
  openGraph: {
    title: "BEKI AUTOCAR – Cars for Sale Ethiopia",
    description: "Buy and sell luxury cars in Ethiopia. Toyota, BYD, SUVs and more. Ethiopian car marketplace Addis Ababa.",
    url: "https://bekiautocar.com",
    siteName: "BEKI AUTOCAR",
    locale: "en_ET",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
