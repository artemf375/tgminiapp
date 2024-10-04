import { Suit, CardName, Card } from "@/types";
import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "lucide-react";

const suits: Suit[] = ["Heart", "Diamond", "Club", "Spade"];
const cardNames: CardName[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

function convertCardNameToValue(name: string): number {
  if (name === "J" || name === "Q" || name === "K") return 10;
  if (name === "A") return 11;

  return Number(name);
}

function iconizeSuit(suit: Suit, size: number): React.ReactElement {
  switch (suit) {
    case "Heart":
      return <HeartIcon size={size} fill="red" color="red" />;
    case "Diamond":
      return <DiamondIcon size={size} fill="red" color="red" />;
    case "Club":
      return <ClubIcon size={size} fill="black" color="black" />;
    default:
      return <SpadeIcon size={size} fill="black" color="black" />;
  }
}

export function handleShuffleDeck(array: Card[]): Card[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export const deckOfCards: Card[] = suits
  .map((suit) => {
    const deck = [];

    for (let i = 0; i < cardNames.length; i++) {
      deck.push({
        suit: suit,
        icon: iconizeSuit(suit, 16),
        displayIcon: iconizeSuit(suit, 40),
        name: cardNames[i],
        value: convertCardNameToValue(cardNames[i]),
      });
    }

    return deck;
  })
  .flat(1);

export const shuffledDeckOfCards: Card[] = handleShuffleDeck(deckOfCards);