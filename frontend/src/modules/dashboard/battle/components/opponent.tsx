"use client";

import { Progress } from "@/components/ui/progress";
import { Pokemon } from "@/types";
import Image from "next/image";

export function Opponent({
  opponentPokemon,
  isLoading,
  hp,
}: {
  opponentPokemon: Pokemon;
  hp: number;
  isLoading: boolean;
}) {
  return (
    <div>
      {opponentPokemon && !isLoading &&(
        <>
          <Progress
            className="w-full"
            value={hp}
            max={
              opponentPokemon.stats.find((stats) => stats.stat.name === "hp")
                ?.base_stat
            }
          />
          <Image
            src={opponentPokemon?.sprites.front_default || ""}
            alt="Selected pokemon"
            width={200}
            height={200}
          />
        </>
      )}
    </div>
  );
}
