"use client";

import { Pokemon } from "@/types";
import Image from "next/image";

export function TargetPokemon({
  isCapturing,
  pokemon,
}: {
  isCapturing: boolean;
  pokemon: Pokemon;
}) {
  return (
    <div
      className="absolute top-1/2 left-1/3 translate-x-2/4  translate-y-2/4"
      style={isCapturing ? { display: "none" } : { display: "block" }}
    >
      <Image
        src={pokemon.sprites.front_default || "/locked-pokemon.png"}
        alt="Pokemon"
        width={150}
        height={150}
      />
    </div>
  );
}
