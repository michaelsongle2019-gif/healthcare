import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "KANGLO MEDICAL",
  description:
    "Professional bilingual presentation of authentic medical devices, consumables, official references, and product-ready technical information."
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
            "--font-brand":
              '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", "Source Han Sans SC", sans-serif',
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
