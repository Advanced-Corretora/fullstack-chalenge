"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Pokemon } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { saveNewPokemon } from "../services";
import { useSession } from "next-auth/react";

export function SuccessHunt({ pokemon, successHunt }: any) {
  const { toast } = useToast();

  const [open, setOpen] = useState(successHunt);
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon | null>(null);
  const { data } = useSession();

  const getNewPokemonInfo = async () => {
    try {
      const data = await fetch(pokemon.url);
      const res = await data.json();
      setPokemonInfo(res);
    } catch (error) {
      toast({
        title: "Erro ao buscar informações do Pokémon!",
        description: "Tente novamente mais tarde.",
      });
    }
  };

  const saveNewUserPokemon = async () => {
    try {
      await saveNewPokemon(pokemonInfo!, data?.user._id);
      toast({
        title: "Obaaaaaa",
        description: "Pokemon adicionado a sua pokedex",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao salvar novo Pokémon!",
        description: "Tente novamente mais tarde.",
      });
    }
  };

  useEffect(() => {
    getNewPokemonInfo();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OWWWW, Olha que incrivel</DialogTitle>
          <DialogDescription>
            Seu novo Pokémon é um {pokemonInfo?.name}!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <Image
              priority
              src={pokemonInfo?.sprites.front_default || ""}
              width={116}
              height={116}
              alt={pokemonInfo?.name || ""}
              className="w-32 h-32"
            />
          </div>
          <div>
            <h3 className="text-center text-2xl font-bold">
              {pokemonInfo?.name}
            </h3>
            <div className="flex justify-center gap-4">
              <span>
                <strong>Altura:</strong> {pokemonInfo?.height}
              </span>
              <span>
                <strong>Peso:</strong> {pokemonInfo?.weight}
              </span>
            </div>
            <div className="flex justify-center gap-4">
              <span>
                <strong>Experiência Base:</strong>{" "}
                {pokemonInfo?.base_experience}
              </span>
              <span>
                <strong>Ordem:</strong> {pokemonInfo?.order}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Descartar</Button>
          </DialogClose>
          <Button onClick={() => saveNewUserPokemon()}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
