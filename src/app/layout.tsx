import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles/globals.css";
import { ReactNode } from "react";

const poppins = Poppins({
  subsets:['latin'],
  weight:['400', '600'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Un respiro para tu mente",
  description: "Un espacio para respirar y dar una pausa",
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return(
    <html lang="es">
      <body className={`${poppins.variable} min-h-screen bg-gradient-to-br from-rose-100 to-amber-100 text-rose-900`}>
        {children} 
      </body>
    </html>
  )
}

