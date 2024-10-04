"use client";

import { Card } from "@/types";
import clsx from "clsx";
import { motion } from "framer-motion";

function CardWrapper({ details }: { details: Card | null }) {
  if (!details)
    return (
      <motion.div
        className="bg-white py-2 px-1 rounded-lg shadow-md flex justify-center items-center"
        style={{ width: 100, height: 150 }}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        layout
      >
        <h1 className="font-extrabold text-xs text-center border-2 border-black">
          BLΛƆK JΛƆK
        </h1>
      </motion.div>
    );

  const { suit, icon, displayIcon, name } = details;

  const CardEdge = (
    <div
      className={clsx(
        "w-2/5",
        "flex",
        "flex-col",
        "items-center",
        "font-bold",
        suit === "Diamond" || suit === "Heart" ? "text-red-600" : "text-black"
      )}
    >
      <span>{name}</span>
      <span>{icon}</span>
    </div>
  );

  return (
    <motion.div
      className="bg-white py-2 px-1 rounded-lg shadow-md flex flex-col"
      style={{ width: 100, height: 150 }}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <div>{CardEdge}</div>
      <div className="flex-1 flex justify-center items-center">
        {displayIcon}
      </div>
      <div className="rotate-180">{CardEdge}</div>
    </motion.div>
  );
}

export default CardWrapper;