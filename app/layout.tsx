import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataHealth Profiler",
  description: "Turn any dataset into an actionable health report with AI-assisted insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
