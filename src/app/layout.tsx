import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kangyu Medical",
  description: "Medical devices and consumables site with bilingual catalog and admin."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        style={
          {
            "--font-display": '"Georgia", "Times New Roman", serif',
            "--font-body":
              '"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'
          } as CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}
