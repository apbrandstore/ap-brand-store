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
            var headerBg = p['header'] || p['background'];
            if (headerBg && typeof headerBg === 'string') {
              var hex = headerBg.trim();
              if (hex.charAt(0) === '#') hex = hex.slice(1);
              if (hex.length === 3 && /^[0-9a-fA-F]{3}$/.test(hex)) {
                hex = hex.charAt(0)+hex.charAt(0)+hex.charAt(1)+hex.charAt(1)+hex.charAt(2)+hex.charAt(2);
              }
              if (hex.length === 6 && /^[0-9a-fA-F]{6}$/.test(hex)) {
                var r0 = parseInt(hex.slice(0,2), 16);
                var g0 = parseInt(hex.slice(2,4), 16);
                var b0 = parseInt(hex.slice(4,6), 16);
                var lum = (0.299*r0 + 0.587*g0 + 0.114*b0)/255;
                r.setAttribute('data-theme-mode', lum < 0.5 ? 'dark' : 'light');
              }
            }
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
