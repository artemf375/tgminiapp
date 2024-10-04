"use client";

import { BlackjackContext } from "@/context/Casino/Blackjack/BlackjackProvider";
import CardWrapper from "./CardWrapper";
import { DrawnCards } from "@/types";
import clsx from "clsx";
import { useContext } from "react";

function DrawnCardsWrapper({ drawnCards }: { drawnCards: DrawnCards }) {
  const { showHiddenDealerCard } = useContext(BlackjackContext);
  const { player, numberOfCards, sumOfCards, cards } = drawnCards;

  const CardSum = (
    <div className="flex gap-2 items-center text-white">
      <span>{player && `${player}:`}</span>
      <span>
        {player === "You"
          ? sumOfCards
          : showHiddenDealerCard
          ? sumOfCards
          : cards[1]?.value}
      </span>
    </div>
  );

  const DrawDeck = (
    <div className="flex-1 flex">
      {cards.map((card, index) => {
        const hiddenDealerCard = player === "Dealer" && index === 0;
        const angle =
          (index - (numberOfCards - 1) / 2) * (player === "You" ? 5 : -5);

        return (
          <div
            key={index}
            style={{
              zIndex: index,
              transform: `rotate(${angle}deg)`,
              transformOrigin:
                player === "You" ? "bottom center" : "top center",
              marginLeft: index === 0 ? 0 : "-60px",
            }}
          >
            <CardWrapper
              details={
                !hiddenDealerCard ? card : showHiddenDealerCard ? card : null
              }
            />
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      className={clsx(
        "w-full",
        "min-h-48",
        "flex",
        "flex-col",
        "gap-4",
        "items-center",
        player === "Dealer" && "flex-col-reverse"
      )}
    >
      {DrawDeck}
      {CardSum}
    </section>
  );
}

export default DrawnCardsWrapper;