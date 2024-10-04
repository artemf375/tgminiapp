"use client";

import clsx from "clsx";
import { Btn } from "@/types";
import { useGameControls } from "@/context/Casino/Blackjack/GameControlsProvider";

function Button({ settings }: { settings: Btn }) {
  const { autoDraw, pauseGame } = useGameControls();
  const { btnIcon, btnName, color, action } = settings;

  return (
    <button
      className={clsx(
        "w-full",
        "flex",
        // "flex-col",
        // "md:flex-row",
        "justify-center",
        "items-center",
        "gap-1",
        autoDraw || pauseGame ? "bg-neutral-300" : color,
        autoDraw || pauseGame ? "cursor-default" : "cursor-pointer",
        "px-2",
        "lg:px-8",
        "py-2",
        "text-xs",
        "text-center",
        "text-white",
        "font-bold",
        "rounded-lg",
        "shadow-lg"
      )}
      onClick={action}
      disabled={autoDraw || pauseGame}
    >
      <span>{btnIcon}</span>
      <span>{btnName}</span>
    </button>
  );
}

export default Button;