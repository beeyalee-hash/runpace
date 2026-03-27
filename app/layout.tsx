import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RunPace - Marathon Pace Calculator",
  description: "Calculate your marathon pace and split times for optimal race performance",
  keywords: ["marathon", "running", "pace calculator", "split times", "training"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
