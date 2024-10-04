"use client";

import { usePlayerStats } from "@/context/Casino/Blackjack/PlayerStatsProvider";
import { Chip } from "@/types";
import { initHapticFeedback } from "@telegram-apps/sdk-react";
import clsx from "clsx";
import { X } from "lucide-react";

function PlayerFunds() {
  const { playerBet, playerBank, addToBet, clearBet } = usePlayerStats();

  const hapticFeedback = initHapticFeedback();

  const chips: Chip[] = [
    {
      value: 0.01,
      color: "bg-green-500",
    },
    {
      value: 0.05,
      color: "bg-amber-700",
    },
    {
      value: 0.1,
      color: "bg-orange-500",
    },
    {
      value: 0.2,
      color: "bg-red-500",
    },
    {
      value: 0.5,
      color: "bg-purple-500",
    },
    {
      value: 1,
      color: "bg-lime-500",
    },
    {
      value: 2,
      color: "bg-yellow-500",
    },
    {
      value: 10,
      color: "bg-blue-500",
    },
  ];

  const ChipsDisplay = (
    <span className="grid grid-cols-4 gap-4">
      {chips.map((chip, index) => (
        <span
          key={index}
          className={clsx(
            "p-3",
            "rounded-full",
            "border",
            "border-white",
            "font-bold",
            "grow-0",
            "shrink-0",
            "h-16",
            "w-16",
            "place-content-center",
            "text-center",
            "text-white",
            "shadow-lg",
            "transition-colors",
            "ease-in-out",
            playerBank - playerBet < chip.value ? "bg-neutral-500" : chip.color,
            playerBank - playerBet < chip.value
              ? "cursor-default"
              : "cursor-pointer"
          )}
          onClick={() => {
            hapticFeedback.impactOccurred("light");
            addToBet(chip.value)
          }}
        >
          {chip.value}
        </span>
      ))}
    </span>
  );

  const playerBetWrapper = (
    <span className="flex flex-col items-center gap-2 text-neutral-800">
      <span>Your Bet</span>
      <span className="w-48 border rounded-lg py-2 px-2 font-bold flex items-center justify-between">
        <X size={18} className="cursor-pointer" onClick={clearBet} />
        <span className="flex-1 text-center">{process.env.NEXT_PUBLIC_TOKEN_TICKER} {playerBet}</span>
      </span>
    </span>
  );

  return (
    <span className="flex flex-col items-center gap-6 my-4">
      {ChipsDisplay}
      {playerBetWrapper}
    </span>
  );
}

export default PlayerFunds;