"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ViewStatus } from "../../pokemons/components/view-status";
import { UserPokemon } from "@/types";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function RankingTable({ pokemons }: { pokemons: UserPokemon[] }) {
  if (pokemons.length === 0) {
    return <div>Nenhum pokemon encontrado</div>;
  }

  const sortedPokemons = [...pokemons].sort((a, b) => {
    const aAttackStat = a.stats.find((stat) => stat.type === "attack");
    const bAttackStat = b.stats.find((stat) => stat.type === "attack");
    return (bAttackStat?.base_stat || 0) - (aAttackStat?.base_stat || 0);
  });

  const topThreePokemons = sortedPokemons.slice(0, 3);

  return (
    <ScrollArea className="rounded-md overflow-auto border h-[280px] lg:h-[280px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Experiencia</TableHead>
            <TableHead className="">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topThreePokemons.map((pokemon) => (
            <TableRow key={pokemon.id}>
              <TableCell className="">
                <Image
                  src={pokemon.image || "/locked-pokemon.png"}
                  width={60}
                  height={60}
                  alt={pokemon.name}
                  className="w-16 h-16"
                />
              </TableCell>
              <TableCell>{pokemon.name}</TableCell>
              <TableCell>{pokemon.base_experience}</TableCell>
              <TableCell className="cursor-pointer">
                <ViewStatus fullData={pokemon} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
