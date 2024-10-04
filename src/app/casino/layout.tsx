import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BlackjackProvider from "@/context/Casino/Blackjack/BlackjackProvider";
import PlayerStatsProvider from "@/context/Casino/Blackjack/PlayerStatsProvider";
import GameControlsProvider from "@/context/Casino/Blackjack/GameControlsProvider";
import { useInitData } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLΛƆK JΛƆK | Card Game",
  description: "Blackjack game created with NextJS + Typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PlayerStatsProvider>
      <GameControlsProvider>
        <BlackjackProvider>
          <div className={inter.className}>{children}</div>
        </BlackjackProvider>
      </GameControlsProvider>
    </PlayerStatsProvider>
  );
}