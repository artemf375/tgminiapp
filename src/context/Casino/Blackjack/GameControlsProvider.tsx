"use client";

import { DealResult, GameControlContextTypes } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePlayerStats } from "./PlayerStatsProvider";

const GameControlContext = createContext({} as GameControlContextTypes);

export default function GameControlsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { playerBank, setPlayerBank, playerBet, setPlayerBet, setTotalGames } =
    usePlayerStats();
  const [showDealWindow, setShowDealWindow] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [pauseGame, setPauseGame] = useState(false);
  const [autoDraw, setAutoDraw] = useState(false);
  const [dealResult, setDealResult] = useState<DealResult>({} as DealResult);
  const [showDealResultWindow, setShowDealResultWindow] = useState(false);

  function handleStartGame(): void {
    setShowDealWindow(false);
    setStartGame(true);
    setAutoDraw(true);
    setPauseGame(false);
  }

  function handleRestartGame(): void {
    setShowDealResultWindow(false);
    setPlayerBet(0);
    setStartGame(false);
    setDealResult({} as DealResult);
    setShowDealWindow(true);
  }

  function populateDealResult(result: "win" | "lose" | "tie"): void {
    setPauseGame(true);

    let resultType = "";
    let multiplier = 0;

    switch (result) {
      case "win":
        resultType = "You Win!";
        multiplier = 1;
        break;
      case "lose":
        resultType = "Dealer Wins!";
        multiplier = -1;
        break;
      default:
        resultType = "It's a tie! Bet has been refunded.";
        multiplier = 0;
        break;
    }

    const earnings: number = playerBet * multiplier;

    setPlayerBank(Number(playerBank) + earnings);

    setTotalGames((g) => g + 1);
    setDealResult({
      result: resultType,
      earnings: playerBet * multiplier,
      newBalance: Number(playerBank) + playerBet * multiplier,
    });
    // setPlayerBet(0);
  }

  useEffect(() => {
    if (!pauseGame) return;
    const timer = setTimeout(() => setShowDealResultWindow(true), 1500);

    return () => clearTimeout(timer);
  }, [pauseGame]);

  const settings: GameControlContextTypes = {
    showDealWindow,
    setShowDealWindow,
    autoDraw,
    setAutoDraw,
    startGame,
    pauseGame,
    setPauseGame,
    dealResult,
    showDealResultWindow,
    setShowDealResultWindow,
    handleStartGame,
    handleRestartGame,
    populateDealResult,
  };

  return (
    <GameControlContext.Provider value={settings}>
      {children}
    </GameControlContext.Provider>
  );
}

export function useGameControls() {
  return useContext(GameControlContext);
}