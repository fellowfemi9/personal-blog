import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Femi9 Power",
  description: "Femi9 Power — a personal blog by Janane Suresh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}
