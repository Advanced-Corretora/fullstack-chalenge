'use client'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function HuntPokemonCard() {
  return (
    <Card className="flex-1 min-w-[300px]">
      <CardHeader>
        <CardTitle>Caçar Pokemons</CardTitle>
        <CardDescription>
          Vá para a floresta e capture pokemons selvagens
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Link href="/huntings">Caçar</Link>
      </CardFooter>
    </Card>
  );
}
