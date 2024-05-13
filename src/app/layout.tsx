import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "ระบบประกาศห้อง​เรียน โรงเรียนเตรียมอุดมศึกษา",
  description: "ระบบประกาศห้อง​เรียน โรงเรียนเตรียมอุดมศึกษา",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className={cn(notoSansThai.variable)}>{children}</body>
      <GoogleAnalytics gaId="G-QERS0KFLMK" />
    </html>
  );
}
