"use client"
import BackButton from "@/components/BackButton/BackButton";


export default function BelotPage() {

    const backButton = BackButton();

    return (
        <main className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#6ea44f] via-[#5b8b46] to-[#1e4d07] gap-[5vh] lg:gap-[5vh]">
            <div className="flex flex-col items-center gap-[5vh]">
                <h1 className="text-4xl lg:text-6xl font-extrabold text-white">Coming Soon</h1>
            </div>
        </main>
    )
}