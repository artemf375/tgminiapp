"use client";

import { usePlayerStats } from "@/context/Casino/Blackjack/PlayerStatsProvider";

function PlayerBalance() {
  const { playerBank, playerBet } = usePlayerStats();

  return (
    <div className="flex justify-center">
      <span className="flex gap-1 items-center text-sm md:text-base text-center text-white bg-neutral-800 px-8 py-1.5 md:py-3 rounded-t-lg">
        <span className="font-bold">Balance: {process.env.NEXT_PUBLIC_TOKEN_TICKER} {playerBank}</span>
        <span className="italic font-thin text-xs">
          {playerBet ? `\(${process.env.NEXT_PUBLIC_TOKEN_TICKER} ${playerBet}\)` : null}
        </span>
      </span>
    </div>
  );
}

export default PlayerBalance;