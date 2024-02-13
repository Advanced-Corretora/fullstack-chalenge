"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function BattleCard() {
  return (
    <Card className="flex-1 min-w-[300px]">
      <CardHeader>
        <CardTitle>Batalha Pokemon</CardTitle>
        <CardDescription>
          Entre nessa arena e mostre que você é o melhor treinador de pokemons
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Link href="/battle">Batalhar</Link>
      </CardFooter>
    </Card>
  );
}
