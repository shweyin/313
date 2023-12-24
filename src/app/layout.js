import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "313 Tracker App",
  description: "Created by Shweyin and Noa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
