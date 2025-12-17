import type { Metadata } from "next";
import "./globals.css";
import { WalletConnectProvider } from "./Components/WalletConnectProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Dexora | Decentralized Exchange on Polygon | Trade, Stake, Play & Earn with $DORA",
  description: "Dexora is a next-gen decentralized exchange built on the Polygon blockchain. Trade securely, stake for passive rewards, and earn $DORA through the Tap Tap Game. No KYC, low fees, and full ownership in a gamified DeFi ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative text-lg leading-[1.4] ">
        <WalletConnectProvider>
          {children}
          <Toaster />
        </WalletConnectProvider>
      </body>
    </html>
  );
}
