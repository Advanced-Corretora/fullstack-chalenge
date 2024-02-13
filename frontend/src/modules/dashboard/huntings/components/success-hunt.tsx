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
import Image from "next/image";
import { useState } from "react";
import { saveNewPokemon } from "../services";
import { useSession } from "next-auth/react";
import { Pokemon } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function SuccessHunt({
  pokemon,
  successHunt,
}: {
  pokemon: Pokemon;
  successHunt: boolean;
}) {
  const { toast } = useToast();

  const [open, setOpen] = useState(successHunt);
  const [loadig, setLoading] = useState(false);
  const { data }: any = useSession();

  const saveNewUserPokemon = async () => {
    try {
      setLoading(true);
      await saveNewPokemon(pokemon!, data?.user?._id);
      toast({
        title: "Obaaaaaa",
        description: "Pokemon adicionado a sua pokedex",
      });
      setOpen(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Erro ao salvar novo Pokémon!",
        description: "Tente novamente mais tarde.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OWWWW, Olha que incrivel</DialogTitle>
          <DialogDescription>
            Seu novo Pokémon é um {pokemon?.name}!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">
            <Image
              priority
              src={pokemon?.sprites.front_default || ""}
              width={116}
              height={116}
              alt={pokemon?.name || ""}
              className="w-32 h-32"
            />
          </div>
          <div>
            <h3 className="text-center text-2xl font-bold">{pokemon?.name}</h3>
            <div className="flex justify-center gap-4">
              <span>
                <strong>Altura:</strong> {pokemon?.height}
              </span>
              <span>
                <strong>Peso:</strong> {pokemon?.weight}
              </span>
            </div>
            <div className="flex justify-center gap-4">
              <span>
                <strong>Experiência Base:</strong> {pokemon?.base_experience}
              </span>
              <span>
                <strong>Ordem:</strong> {pokemon?.order}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Descartar</Button>
          </DialogClose>
          <Button
            className="flex items-center gap-2"
            disabled={loadig}
            onClick={() => saveNewUserPokemon()}
          >
            {loadig && <AiOutlineLoading3Quarters className="animate-spin" />}
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
