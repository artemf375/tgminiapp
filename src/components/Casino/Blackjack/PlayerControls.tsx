"use client";

import { useContext } from "react";
import Button from "./Button";
import { Btn } from "@/types";
import { CirclePlus, ThumbsUp } from "lucide-react";
import { BlackjackContext } from "@/context/Casino/Blackjack/BlackjackProvider";
import { usePlayerStats } from "@/context/Casino/Blackjack/PlayerStatsProvider";

function PlayerControls() {
  const { playerBet } = usePlayerStats();
  const { handleHit, handleFinishTurn } = useContext(BlackjackContext);

  const BetAmount = (
    <div className="flex-1 flex flex-col items-center bg-white/20 px-2 md:px-6 py-1 md:py-2 rounded-lg text-white leading-tight">
      <span className="text-sm">Bet</span>
      <span className="font-semibold">{process.env.NEXT_PUBLIC_TOKEN_TICKER} {playerBet}</span>
    </div>
  );

  const HitBtn: Btn = {
    btnIcon: <CirclePlus />,
    btnName: "Hit",
    color: "bg-yellow-500",
    action: handleHit,
  };

  const StandBtn: Btn = {
    btnIcon: <ThumbsUp />,
    btnName: "Stand",
    color: "bg-yellow-500",
    action: handleFinishTurn,
  };

  return (
    <div className="w-11/12 md:w-1/2 mx-auto flex justify-evenly items-center my-6 lg:my-10 gap-4 md:gap-8">
      <span className="flex-1 text-center">
        <Button settings={HitBtn} />
      </span>
      {BetAmount}
      <span className="flex-1 text-center">
        <Button settings={StandBtn} />
      </span>
    </div>
  );
}

export default PlayerControls;