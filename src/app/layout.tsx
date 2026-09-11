import type { Metadata } from "next";
import { Inter, Poller_One, Prata } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import Navbar from "@/components/ui/navigation/Header";
import { Toaster } from "sonner";
import { CurrencyProvider } from "@/providers/currency-provider";

const prata = Prata({
  variable: "--font-prata",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const pollerOne = Poller_One({
  variable: "--font-poller-one",
  weight: "400",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Your Store",
  description: "Your ecommerce store",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${prata.variable} ${inter.variable} ${pollerOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster
          position="top-left"
          toastOptions={{
            classNames: {
              success: "bg-near-black border border-gold text-white",
              error: "bg-near-black border border-red-500 text-white",
              info: "bg-near-black border border-gold text-white",
            },
          }}
        />
        <QueryProvider>
          <Navbar />
          <CurrencyProvider>{children}</CurrencyProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
