"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserPokemon } from "@/types";
import { useState } from "react";

export function SelectPokemon({
  userPokemons,
  setOpen,
  setSelectedPokemon,
}: {
  userPokemons: UserPokemon[];
  setSelectedPokemon: any;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div className="h-full flex flex-col w-full p-8  left-0 top-0 absolute z-[999999999999] bg-black bg-opacity-85 sm:p-16">
      <h1 className=" text-3xl font-bold flex items-center justify-between text-white">
        Selecione o seu pokemon para batalhar contra o oponente

        <Button onClick={() => {
          setOpen(false)
        }} className=" text-2xl text-foreground" variant='outline'>X</Button>
      </h1>

      <div className="flex flex-nowrap gap-2 h-auto py-8 overflow-auto">
        {userPokemons.map((pokemon, index) => {
          return (
            <Card
              key={index}
              className=" min-w-56 h-56 flex items-center justify-center flex-col gap-2"
            >
              <img src={pokemon.image || ""} alt="Pokemon Image" />
              <span className="text-center">{pokemon.name}</span>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  setSelectedPokemon(pokemon);
                }}
              >
                Selecionar
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
