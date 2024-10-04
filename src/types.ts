export type CardName =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type Suit = "Heart" | "Diamond" | "Club" | "Spade";

export type Card = {
  suit: Suit;
  icon: React.ReactElement;
  displayIcon: React.ReactElement;
  name: CardName;
  value: number;
};

export type DrawnCards = {
  player?: "Dealer" | "You";
  numberOfCards: number;
  sumOfCards: number;
  cards: Card[];
};

export type ChipValue = 0.01 | 0.05 | 0.1 | 0.2 | 0.5 | 1 | 2 | 5 | 10;

export type Chip = {
  value: ChipValue;
  color: string;
};

export type Btn = {
  btnIcon: React.ReactElement;
  btnName: string;
  color: string;
  action?: (args?: any) => void;
};

export type DealResult = {
  result: string;
  earnings: number;
  newBalance: number;
};

export type BlackjackLogicContextTypes = {
  gameDeck: Card[];
  setGameDeck: React.Dispatch<React.SetStateAction<Card[]>>;
  drawCardCount: number;
  setPlayerDrawnCards: React.Dispatch<React.SetStateAction<DrawnCards>>;
  showHiddenDealerCard: boolean;
  playerDrawnCards: DrawnCards;
  dealerDrawnCards: DrawnCards;
  handleHit: () => void;
  handleFinishTurn: () => void;
};

export type GameControlContextTypes = {
  showDealWindow: boolean;
  setShowDealWindow: React.Dispatch<React.SetStateAction<boolean>>;
  autoDraw: boolean;
  setAutoDraw: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: boolean;
  pauseGame: boolean;
  setPauseGame: React.Dispatch<React.SetStateAction<boolean>>;
  dealResult: DealResult;
  showDealResultWindow: boolean;
  setShowDealResultWindow: React.Dispatch<React.SetStateAction<boolean>>;
  handleStartGame: () => void;
  handleRestartGame: () => void;
  populateDealResult: (result: "win" | "lose" | "tie") => void;
};

export type PlayerStatsContextTypes = {
  playerBank: number;
  setPlayerBank: (newBank: number) => void;
  playerBet: number;
  setPlayerBet: React.Dispatch<React.SetStateAction<number>>;
  totalGames: number;
  setTotalGames: React.Dispatch<React.SetStateAction<number>>;
  addToBet: (chipValue: number) => void;
  clearBet: () => void;
};