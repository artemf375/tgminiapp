"use client";

import { Card, BlackjackLogicContextTypes, DrawnCards } from "@/types";
import { createContext, useEffect, useState } from "react";
import {
  deckOfCards,
  handleShuffleDeck,
  shuffledDeckOfCards,
} from "@/utils/Casino/Blackjack/DeckOfCards";
import { addOneCard } from "@/utils/Casino/Blackjack/addOneCard";
import { useGameControls } from "./GameControlsProvider";
import { compareCards } from "@/utils/Casino/Blackjack/compareCards";
import { initHapticFeedback } from "@telegram-apps/sdk-react";

// import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "lucide-react";

export const BlackjackContext = createContext({} as BlackjackLogicContextTypes);

const initialState: DrawnCards = {
  numberOfCards: 0,
  sumOfCards: 0,
  cards: [],
};

// const dummyCards: Card[] = [
//   {
//     suit: "Diamond",
//     icon: <DiamondIcon />,
//     displayIcon: <DiamondIcon />,
//     name: "10",
//     value: 10,
//   },
//   {
//     suit: "Heart",
//     icon: <HeartIcon />,
//     displayIcon: <HeartIcon />,
//     name: "2",
//     value: 2,
//   },
//   {
//     suit: "Spade",
//     icon: <SpadeIcon />,
//     displayIcon: <SpadeIcon />,
//     name: "A",
//     value: 11,
//   },
//   {
//     suit: "Spade",
//     icon: <SpadeIcon />,
//     displayIcon: <SpadeIcon />,
//     name: "10",
//     value: 10,
//   },
//   {
//     suit: "Diamond",
//     icon: <DiamondIcon />,
//     displayIcon: <DiamondIcon />,
//     name: "7",
//     value: 7,
//   },
//   {
//     suit: "Diamond",
//     icon: <DiamondIcon />,
//     displayIcon: <DiamondIcon />,
//     name: "2",
//     value: 2,
//   },
//   {
//     suit: "Diamond",
//     icon: <DiamondIcon />,
//     displayIcon: <DiamondIcon />,
//     name: "3",
//     value: 3,
//   },
// ];

function BlackjackProvider({ children }: { children: React.ReactNode }) {
  const {
    startGame,
    pauseGame,
    setPauseGame,
    autoDraw,
    setAutoDraw,
    populateDealResult,
    showDealResultWindow,
  } = useGameControls();
  // const [gameDeck, setGameDeck] = useState<Card[]>(dummyCards);
  const [gameDeck, setGameDeck] = useState<Card[]>(shuffledDeckOfCards);
  const [drawCardCount, setDrawCardCount] = useState(0);
  const [showHiddenDealerCard, setShowHiddenDealerCard] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [finishPlayerTurn, setFinishPlayerTurn] = useState(false);
  const [playerDrawnCards, setPlayerDrawnCards] =
    useState<DrawnCards>(initialState);
  const [dealerDrawnCards, setDealerDrawnCards] =
    useState<DrawnCards>(initialState);

    const hapticFeedback = initHapticFeedback();

  const handleHit = (): void => {
    hapticFeedback.impactOccurred("medium");
    addOneCard("You", setPlayerDrawnCards, gameDeck[drawCardCount]);
    setDrawCardCount((c) => c + 1);    
  };

  const handleFinishTurn = (): void => {
    hapticFeedback.impactOccurred("medium");
    setFinishPlayerTurn(true);
    setPlayerTurn(false);
    setShowHiddenDealerCard(true);
    setAutoDraw(true);
  };

  useEffect(() => {
    if (!startGame) return;
    if (!autoDraw) return;

    drawInitialFourCards();

    function drawOneCard() {
      const newCard = gameDeck[drawCardCount];

      if (playerTurn) {
        addOneCard("You", setPlayerDrawnCards, newCard);
      } else {
        if (pauseGame) return;

        addOneCard("Dealer", setDealerDrawnCards, newCard);
      }

      setDrawCardCount((cc) => cc + 1);
    }

    const delay = 750;
    const timer = setTimeout(drawOneCard, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startGame, drawCardCount, playerTurn, autoDraw]);

  useEffect(() => {
    function checkPlayerCards() {
      if (playerDrawnCards.sumOfCards > 21) {
        setShowHiddenDealerCard(true);
        populateDealResult("lose");
      } else if (playerDrawnCards.sumOfCards === 21) {
        handleFinishTurn();
      }
    }
    checkPlayerCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerDrawnCards]);

  useEffect(() => {
    function checkDealerCards() {
      if (finishPlayerTurn && dealerDrawnCards.sumOfCards >= 17) {
        console.log("checkDealerCards:");
        setAutoDraw(false);

        return compareCards(
          finishPlayerTurn,
          playerDrawnCards,
          dealerDrawnCards,
          populateDealResult
        );
      }
    }
    checkDealerCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishPlayerTurn, dealerDrawnCards]);

  useEffect(() => {
    function resetGameStates() {
      if (pauseGame && showDealResultWindow) {
        setGameDeck(handleShuffleDeck(deckOfCards));
        setPlayerDrawnCards(initialState);
        setDealerDrawnCards(initialState);
        setDrawCardCount(0);
        setPlayerTurn(false);
        setFinishPlayerTurn(false);
        setShowHiddenDealerCard(false);
      }

      return;
    }
    resetGameStates();
  }, [pauseGame, showDealResultWindow]);

  function drawInitialFourCards(): void {
    if (!finishPlayerTurn) {
      if (drawCardCount >= 2) setPlayerTurn(true);
      if (drawCardCount >= 4) {
        setAutoDraw(false);
        checkInitialBlackjack();
        return console.log("Initial draw complete");
      }
    }
  }

  function checkInitialBlackjack(): void {
    const playerBlackjack = playerDrawnCards.sumOfCards === 21;

    if (playerBlackjack) {
      setPauseGame(true);
      setAutoDraw(false);
      setFinishPlayerTurn(true);
      setPlayerTurn(false);

      if (dealerDrawnCards.sumOfCards === 21) {
        setShowHiddenDealerCard(true);

        return populateDealResult("tie");
      }
      setShowHiddenDealerCard(true);

      return populateDealResult("win");
    }
  }

  const settings: BlackjackLogicContextTypes = {
    gameDeck,
    setGameDeck,
    drawCardCount,
    setPlayerDrawnCards,
    showHiddenDealerCard,
    playerDrawnCards,
    dealerDrawnCards,
    handleHit,
    handleFinishTurn,
  };

  return (
    <BlackjackContext.Provider value={settings}>
      {children}
    </BlackjackContext.Provider>
  );
}
export default BlackjackProvider;