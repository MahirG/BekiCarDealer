import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beki AutoCar | Cars, clearly selected.",
  description: "A refined way to discover quality vehicles from Beki AutoCar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
