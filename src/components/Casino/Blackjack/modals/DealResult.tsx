"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/Casino/Blackjack/ui/alert-dialog";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { useGameControls } from "@/context/Casino/Blackjack/GameControlsProvider";
import { usePlayerStats } from "@/context/Casino/Blackjack/PlayerStatsProvider";

function DealResult() {
  const { playerBank } = usePlayerStats();
  const {
    dealResult: { result, earnings, newBalance },
    showDealResultWindow,
    setShowDealResultWindow,
    handleRestartGame,
  } = useGameControls();

  const earningsLoss = (
    <span className="flex flex-col items-center gap-2">
      <span>Earnings / Loss</span>
      <span className="font-bold text-lg">{process.env.NEXT_PUBLIC_TOKEN_TICKER} {earnings}</span>
    </span>
  );

  const newBalanceWrapper = (
    <span className="flex flex-col items-center gap-2">
      <span>Your New Balance</span>
      <span className="font-bold text-lg">{process.env.NEXT_PUBLIC_TOKEN_TICKER} {newBalance}</span>
    </span>
  );

  function handleCloseWindow() {
    if (showDealResultWindow) {
      return;
    }

    setShowDealResultWindow(false);
  }

  return (
    <AlertDialog open={showDealResultWindow} onOpenChange={handleCloseWindow}>
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent className="bg-gray-300 bg-opacity-70">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center mb-6">
            {result}
          </AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center gap-4 text-neutral-800">
            {earningsLoss}
            {newBalanceWrapper}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel
            className={buttonVariants({ variant: "destructive" })}
          >
            <Link href={"/casino/blackjack/result"}>Cashout</Link>
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRestartGame}
            disabled={playerBank < 5}
          >
            Make Another Deal
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DealResult;