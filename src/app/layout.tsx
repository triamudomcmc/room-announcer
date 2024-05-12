import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "ระบบประกาศห้อง​ โรงเรียนเตรียมอุดมศึกษา",
  description: "ระบบประกาศห้อง​ โรงเรียนเตรียมอุดมศึกษา",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(notoSansThai.variable)}>{children}</body>
    </html>
  );
}
