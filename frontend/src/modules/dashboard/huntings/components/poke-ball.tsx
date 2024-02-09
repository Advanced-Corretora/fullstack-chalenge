"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { getNewPokemon } from "../services";
import { SuccessHunt } from "./success-hunt";
import { TargetPokemon } from "./locked-pokemon";

export function PokeBall() {
  const router = useRouter();
  const pathname = usePathname();

  const [isCapturing, setIsCapturing] = useState(false);
  const [successHunt, setSuccessHunt] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  const capturePokemon = async () => {
    try {
      setIsCapturing(true);

      const data = await getNewPokemon();

      const captured = Math.random() < 0.5;

      setTimeout(() => {
        if (captured) {
          setPokemon(data.results[0]);
          setSuccessHunt(true);
        } else {
          setPokemon(null);
          setSuccessHunt(false);
        }

        setIsCapturing(false);
      }, 4000);
    } catch (error) {
      setIsCapturing(false);
    }
  };

  return (
    <>
          <TargetPokemon isCapturing={isCapturing} />

      <motion.div
        className="relative"
        animate={{
          y: isCapturing ? [-200, -200, -150, -200, -150, -200, -150, -200] : 0,
          x: isCapturing ? [-160, -140, -130, -140, -130, -140, -130, -140] : 0,
        }}
        transition={{ duration: 4 }}
        onAnimationComplete={() => setIsCapturing(false)}
      >
        <Button
          onClick={capturePokemon}
          className="bg-transparent hover:bg-transparent"
        >
          <Image src="/Poke_ball.webp" alt="Pokeball" width={70} height={70} />
        </Button>
      </motion.div>
      {pokemon && <SuccessHunt pokemon={pokemon} successHunt={successHunt} />}
    </>
  );
}
