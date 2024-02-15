"use client";

import { Pokemon, UserPokemon } from "@/types";
import { useEffect, useState } from "react";
import { SelectPokemon } from "./select-pokemon";
import { Opponent } from "./opponent";
import { UserSelectedPokemon } from "./user-pokemon";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RevalidateOpponent, UpdatePokemonStats } from "../services";
import { useSession } from "next-auth/react";
import { SearchPokemon } from "./search-pokemon";

export function Battle({
  userPokemons,
  opponentPokemon,
}: {
  userPokemons: { user_pokemons: UserPokemon[] };
  opponentPokemon: Pokemon;
}) {
  const [selectedPokemon, setSelectedPokemon] = useState<UserPokemon | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [opponentHp, setOpponentHp] = useState<number>(0);
  const [playerHp, setPlayerHp] = useState<number>(0);
  const [open, setOpen] = useState(true);

  const { toast } = useToast();
  const { data } = useSession();

  useEffect(() => {
    if (selectedPokemon) {
      const playerHp = selectedPokemon?.stats.find(
        (stat) => stat.type === "hp"
      )?.base_stat;
      setPlayerHp(playerHp!);
    }

    if (opponentPokemon) {
      const opponentHp = opponentPokemon.stats.find(
        (stat) => stat.stat.name === "hp"
      )?.base_stat;
      setOpponentHp(opponentHp!);
    }
  }, [selectedPokemon, opponentPokemon]);

  const battlePokemon = () => {
    if (!selectedPokemon || !opponentPokemon) {
      setOpen(true);
      return toast({
        title: "Erro",
        description: "Selecione um Pokémon para batalhar",
      });
    }

    const playerAttack = selectedPokemon?.stats?.find(
      (stat) => stat.type === "attack"
    )?.base_stat;
    const playerDefense = selectedPokemon?.stats?.find(
      (stat) => stat.type === "defense"
    )?.base_stat;

    const opponentAttack = opponentPokemon.stats.find(
      (stat) => stat.stat.name === "attack"
    )?.base_stat;
    const opponentDefense = opponentPokemon.stats.find(
      (stat) => stat.stat.name === "defense"
    )?.base_stat;

    const damagePercentage = 0.4;

    const playerDamage = Math.max(
      Math.ceil((playerAttack! - opponentDefense!) * damagePercentage),
      5
    );
    const opponentDamage = Math.max(
      Math.ceil((opponentAttack! - playerDefense!) * damagePercentage),
      5
    );

    setPlayerHp(playerHp! - opponentDamage);
    setOpponentHp(opponentHp! - playerDamage);
    const randomNumberMinus = Math.floor(Math.random() * 7) + 1;
    const randomNumberPlus = Math.floor(Math.random() * 3) + 1;

    if (playerHp! <= 0) {
      setSelectedPokemon(null);
      const updatedPokemon = {
        ...selectedPokemon,
        base_experience: selectedPokemon.base_experience + randomNumberMinus,
        stats: selectedPokemon.stats.map((stat) => {
          if (stat.type === "hp") {
            return { ...stat, base_stat: stat.base_stat - randomNumberMinus };
          } else if (stat.type === "attack") {
            return { ...stat, base_stat: stat.base_stat - randomNumberMinus };
          } else if (stat.type === "defense") {
            return { ...stat, base_stat: stat.base_stat - randomNumberMinus };
          }
          return stat;
        }),
      };
      UpdatePokemonStats((data?.user as { _id: string })?._id, updatedPokemon);
      return toast({
        title: "Você perdeu",
        description: `Você perdeu a batalha contra ${opponentPokemon.name} e seu pokémon perdeus status!`,
      });
    } else if (opponentHp! <= 0) {
      RevalidateOpponent();
      const updatedPokemon = {
        ...selectedPokemon,
        base_experience: selectedPokemon.base_experience + randomNumberPlus,
        stats: selectedPokemon.stats.map((stat) => {
          if (stat.type === "hp") {
            return { ...stat, base_stat: stat.base_stat + randomNumberPlus };
          } else if (stat.type === "attack") {
            return { ...stat, base_stat: stat.base_stat + randomNumberPlus };
          } else if (stat.type === "defense") {
            return { ...stat, base_stat: stat.base_stat + randomNumberPlus };
          }
          return stat;
        }),
      };
      UpdatePokemonStats((data?.user as { _id: string })?._id, updatedPokemon);
      setIsLoading(true);

      toast({
        title: "Você ganhou",
        description: `Você ganhou a batalha contra ${opponentPokemon.name} e seu pokémon ganhou novos status!`,
      });
      return setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    } else {
      return toast({
        title: "Batalha em andamento",
        description: "Continue lutando!",
      });
    }
  };

  return (
    <div className="arena h-full flex-1 flex flex-col justify-end">
      {isLoading && <SearchPokemon />}
      {!open ? (
        <>
          <div className="overflow-auto gap-4 w-full flex items-end  justify-between flex-1 pb-24 px-[5%] md:px-[10%]">
            <Opponent
              isLoading={isLoading}
              opponentPokemon={opponentPokemon}
              hp={opponentHp}
            />

            <UserSelectedPokemon
              selectedPokemon={selectedPokemon}
              hp={playerHp}
            />
          </div>

          <Button
            disabled={isLoading}
            className="text-lg font-black uppercase rounded-none h-20"
            variant="outline"
            onClick={() => battlePokemon()}
          >
            Atacar
          </Button>
        </>
      ) : (
        <SelectPokemon
          userPokemons={userPokemons.user_pokemons}
          setSelectedPokemon={setSelectedPokemon}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
