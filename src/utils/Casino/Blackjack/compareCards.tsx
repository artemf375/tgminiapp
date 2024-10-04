import { DrawnCards } from "@/types";

export function compareCards(
  state: boolean,
  plCards: DrawnCards,
  dlCards: DrawnCards,
  callback: (result: "win" | "lose" | "tie") => void
): void {
  if (state && dlCards.sumOfCards > 21) {
    callback("win");
  } else if (plCards.sumOfCards > dlCards.sumOfCards) {
    callback("win");

    console.log("You Win!");
  } else if (plCards.sumOfCards === dlCards.sumOfCards) {
    callback("tie");

    console.log("It's a tie! Deal has been refunded.");
  } else {
    callback("lose");

    console.log("Dealer Wins!");
  }
}