import type { Metadata } from "next";
import "./globals.css";
import StarField from "@/components/StarField";
import { SITE } from "@/content/site";

export const metadata: Metadata = {
  title: {
    template: "%s — Tanmaya Wahal",
    default: SITE.name,
  },
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <StarField />
      </body>
    </html>
  );
}
