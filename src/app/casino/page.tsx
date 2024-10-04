"use client";

import BackButton from "@/components/BackButton/BackButton";
import { Link } from "@/components/Link/Link";
import { useInitData } from "@telegram-apps/sdk-react";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { createUser, fetchUser } from "../server";

type PageProps = {
  title: string;
  href: string;
};

export default function Home() {
  const initData = useInitData();

  useEffect(() => {    
    if (initData?.user) {
      fetchUser({
        telegram_id: initData.user.id
      }).then((user) => {
        if (!user && initData.user) {
          window.location.href = '/';
        }
      });
    }
  }, [initData]);

  const backButton = BackButton();

  const pages: PageProps[] = [
    {
      title: "B3L0T",
      href: "/casino/belot"
    },
    {
      title: "BLΛƆKJΛƆK",
      href: "/casino/blackjack/game"
    }
  ];

  const GameLink = (props: PageProps) => (
    <Link
      href={props.href}
      key={props.title}
    >
      <div
        className="font-extrabold text-3xl lg:text-6xl text-center items-center tracking-widest border-4 lg:border-8 border-white text-white px-4 py-2"
      >
        <span>{props.title}</span>
        <span>
          <ChevronRight />
        </span>
      </div>
    </Link>
  )

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#6ea44f] via-[#5b8b46] to-[#1e4d07] gap-[5vh] lg:gap-[5vh]">
      <div className="flex flex-col items-center gap-[5vh]">
      {pages.map((page, index) => (
        <GameLink key={index} {...page} />
      ))}
      </div>
      {/* {StartGameBtn} */}
    </main>
  );
}