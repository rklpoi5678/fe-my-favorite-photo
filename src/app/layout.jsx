import "./globals.css";

import { Noto_Sans_KR } from "next/font/google";
import LocalFont from "next/font/local"

import { rootMetadata } from "#/config/metadata";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

const baskinRobbins = LocalFont({
  src: [
    {
      path: "../assets/fonts/BR_B.woff2",
      weight: '100 900',
      style: 'normal',
    },
    {
      path: "../assets/fonts/BR_B.woff",
      weight: '100 900',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-baskin-robbins'
})

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.variable} ${baskinRobbins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

export const metadata = { ...rootMetadata }