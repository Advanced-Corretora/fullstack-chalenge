"use client";

import Image from "next/image";

export function TargetPokemon({ isCapturing }: { isCapturing: boolean }) {
  return (
    <div
      className="absolute top-1/2 left-1/3 translate-x-2/4  translate-y-2/4"
      style={isCapturing ? { display: "none" } : { display: "block" }}
    >
      <Image src="/locked-pokemon.png" alt="Pokemon" width={120} height={240} />
    </div>
  );
}
