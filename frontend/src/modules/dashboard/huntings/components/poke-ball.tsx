"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { SuccessHunt } from "./success-hunt";
import { TargetPokemon } from "./locked-pokemon";
import { useToast } from "@/components/ui/use-toast";
import { Pokemon } from "@/types";

export function PokeBall({ huntedPokemon }: { huntedPokemon: Pokemon }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [successHunt, setSuccessHunt] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { toast } = useToast();

  const capturePokemon = async () => {
    try {
      setIsCapturing(true);

      const captured = Math.random() < 0.5;

      setTimeout(() => {
        if (captured) {
          setPokemon(huntedPokemon);
          setSuccessHunt(true);
        } else {
          setPokemon(null);
          toast({
            title: "O Pokemon fugiu",
            description: "Tente novamente",
          });
          setSuccessHunt(false);
        }
      }, 2000);
    } catch (error) {
      toast({
        title: "Erro ao capturar o pokemon",
        description: "Tente novamente",
      });
    }
  };



  return (
    <>
      <TargetPokemon pokemon={huntedPokemon} isCapturing={isCapturing} />

      <motion.div
        className="relative"
        animate={{
          y: isCapturing
            ? [-200, -200, -150, -200, -150, -200, -150, -200, 0]
            : 0,
          x: isCapturing
            ? [-160, -140, -130, -140, -130, -140, -130, -140, 0]
            : 0,
        }}
        transition={{ duration: 2 }}
        onAnimationComplete={() => {
          setIsCapturing(false);
        }}
      >
        <Button
          onClick={() =>capturePokemon()}
          className="bg-transparent hover:bg-transparent"
          disabled={isCapturing}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/601px-Pokebola-pokeball-png-0.png"
            alt="Pokeball"
            width={70}
            height={70}
          />
        </Button>
      </motion.div>
      {pokemon && <SuccessHunt pokemon={pokemon} setPokemon={setPokemon} successHunt={successHunt} />}
    </>
  );
}
