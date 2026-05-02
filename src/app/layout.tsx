import type { ReactNode } from "react";

import "@/styles/globals.css";
import "aos/dist/aos.css";
import { Geist } from "next/font/google";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { THEME_CACHE_VERSION, THEME_LS_KEY, THEME_LS_VERSION_KEY } from "@/lib/theme/themeCacheKeys";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", preload: false });


type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="und" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        try {
          const v = localStorage.getItem('${THEME_LS_VERSION_KEY}');
          const t = localStorage.getItem('${THEME_LS_KEY}');
          if (v === '${THEME_CACHE_VERSION}' && t) {
            const p = JSON.parse(t).resolved_palette;
            const r = document.documentElement;
            Object.entries(p).forEach(([k, val]) => {
              r.style.setProperty('--' + k, val);
            });
          }
        } catch(e) {}
      `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Noto+Sans+Bengali:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
