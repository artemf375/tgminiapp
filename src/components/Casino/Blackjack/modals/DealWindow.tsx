"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Casino/Blackjack/ui/dialog";

import PlayerFunds from "../PlayerFunds";
import { Handshake } from "lucide-react";
import { Button, buttonVariants } from "@/components/Casino/Blackjack/ui/button";
import { useRouter } from "next/navigation";
import { usePlayerStats } from "@/context/Casino/Blackjack/PlayerStatsProvider";
import { useGameControls } from "@/context/Casino/Blackjack/GameControlsProvider";
import { createBrowserNavigatorFromLocation, initHapticFeedback, initMainButton, initNavigator } from "@telegram-apps/sdk-react";
import { useEffect } from "react";

function DealWindow() {
  const { playerBank, playerBet, totalGames } = usePlayerStats();
  const { showDealWindow, setShowDealWindow, startGame, handleStartGame } =
    useGameControls();

  const hapticFeedback = initHapticFeedback();

  function handleCloseWindow() {
    if (!startGame) {
      window.history.back();
    }
    setShowDealWindow(false);
  }

  return (
    <Dialog open={showDealWindow} onOpenChange={handleCloseWindow}>
      <DialogContent className="bg-gray-300 bg-opacity-70">
        <DialogHeader>
          <DialogTitle className="flex flex-col text-center">
            <span className="text-sm">Bank</span>
            <span className="font-bold">{process.env.NEXT_PUBLIC_TOKEN_TICKER} {playerBank}</span>
          </DialogTitle>
          <DialogDescription>
            <PlayerFunds />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            disabled={totalGames === 0}
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => {
              window.location.href = "/casino/result";
            }}
          >
            Cashout
          </Button>
          <Button
            className="flex gap-2 bg-green-500 text-white"
            onClick={() => {
              hapticFeedback.impactOccurred("medium");
              handleStartGame()
            }}
            disabled={playerBet === 0}
          >
            <Handshake size={16} />
            <span>Deal</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DealWindow;