"use client";

import { useContext, useEffect } from "react";
import { BlackjackContext } from "@/context/Casino/Blackjack/BlackjackProvider";
import Header from "@/components/Casino/Blackjack/Header";
import DrawnCardsWrapper from "@/components/Casino/Blackjack/DrawnCardsWrapper";
import PlayerControls from "@/components/Casino/Blackjack/PlayerControls";
import PlayerBalance from "@/components/Casino/Blackjack/PlayerBalance";
import DealWindow from "@/components/Casino/Blackjack/modals/DealWindow";
import DealResult from "@/components/Casino/Blackjack/modals/DealResult";
import { useGameControls } from "@/context/Casino/Blackjack/GameControlsProvider";
import BackButton from "@/components/BackButton/BackButton";
import { initMainButton } from "@telegram-apps/sdk-react";

export default function GamePage() {
  const { startGame, setShowDealWindow } = useGameControls();
  const { dealerDrawnCards, playerDrawnCards } = useContext(BlackjackContext);

  const backButton = BackButton();

  useEffect(() => {
    if (startGame) return;

    setShowDealWindow(true);
  }, [startGame, setShowDealWindow]);


  return (
    <main className="h-screen flex flex-col justify-between bg-gradient-to-b from-[#6ea44f] via-[#5b8b46] to-[#1e4d07]">
      <Header />
      <DrawnCardsWrapper drawnCards={dealerDrawnCards} />
      <PlayerControls />
      <DrawnCardsWrapper drawnCards={playerDrawnCards} />
      <DealWindow />
      <DealResult />
      <PlayerBalance />
    </main>
  );
}