import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from "sonner";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Ai Img Gen",
};

export default function RootLayout({children}: {children:React.ReactNode}) {
    console.log("HELP");
  return (
      <html lang="en">
        <body className={inter.className + " bg-Primary"}>
            {children}
            <Toaster position={"top-right"}/>
        </body>
    </html>
  );
}
