"use client";

import { Pokemon } from "@/types";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export function Opponent({
  opponentPokemon,
  hp,
}: {
  opponentPokemon: Pokemon;
  hp: number;
}) {
  return (
    <div>
      {opponentPokemon && (
        <>
          <Progress
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
