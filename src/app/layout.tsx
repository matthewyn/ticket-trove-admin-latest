import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticket Trove Admin",
  description: "Experience seamless management of your cinema with our intuitive admin website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster position="top-center" gutter={12} containerStyle={{ margin: "8px" }} toastOptions={{ duration: 5000, style: { background: "#363636", color: "#fff", padding: "16px 24px" } }} />
      </body>
    </html>
  );
}
