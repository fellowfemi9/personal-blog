import type { Metadata } from "next";
import "./globals.css";
import QuotePopup from "@/app/components/QuotePopup";
import BottomNav from "@/app/components/BottomNav";
import Sidebar from "@/app/components/Sidebar";

export const metadata: Metadata = {
  metadataBase: new URL("https://femi9power.com"),
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
        <Sidebar />
        {/* On desktop, shift content right by sidebar width (w-60 = 15rem) */}
        <div className="md:pl-60">
          {children}
        </div>
        <BottomNav />
        <QuotePopup />
      </body>
    </html>
  );
}
