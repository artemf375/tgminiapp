"use client";

import { PlayerStatsContextTypes } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import mysql from 'mysql2';
import { getPlayerBalance, updatePlayerBalance } from "./Server";
import { useInitData } from "@telegram-apps/sdk-react";
const PlayerStatsContext = createContext({} as PlayerStatsContextTypes);

export default function PlayerStatsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [playerBank, setPlayerBankVal] = useState(0);
  const [playerBet, setPlayerBet] = useState(0);
  const [totalGames, setTotalGames] = useState(0);


  const initData = useInitData();
  const [telegram_id, setTelegramId] = useState(0);

  useEffect(() => {
    if (initData?.user) {
      setTelegramId(initData.user.id);
    }
  }, [initData]);

  useEffect(() => {
    if (!telegram_id) return;
    getPlayerBalance(telegram_id).then((balance) => {
      setPlayerBankVal(balance);
    });
  }, [telegram_id]);

  const setPlayerBank = (newBank: number): void => {
    updatePlayerBalance(telegram_id, newBank)
    .then((res) => {
      if (!res) return;
      setPlayerBankVal(newBank);
    })
  }

  const addToBet = (chipValue: number): void => {
    if (playerBet + chipValue > playerBank) {
      return;
    }

    setPlayerBet((b) => b + chipValue);
  };

  const clearBet = (): void => {
    setPlayerBet(0);
  };

  const settings = {
    playerBank,
    setPlayerBank,
    playerBet,
    setPlayerBet,
    totalGames,
    setTotalGames,
    addToBet,
    clearBet,
  };

  return (
    <PlayerStatsContext.Provider value={settings}>
      {children}
    </PlayerStatsContext.Provider>
  );
}

export function usePlayerStats() {
  return useContext(PlayerStatsContext);
}