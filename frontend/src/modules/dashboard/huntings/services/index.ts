"use server";

import { Pokemon } from "@/types";
import { revalidateTag } from "next/cache";

export async function saveNewPokemon(pokemon: Pokemon, userId?: string) {
  const pokemonData = {
    name: pokemon.name,
    image: pokemon.sprites.front_default,
    weigth: pokemon.weight,
    heigth: pokemon.height,
    base_experience: pokemon.base_experience,
    id: pokemon.id,
    captured_at: Date.now(),
    stats: pokemon.stats.map((stat) => ({
      base_stat: stat.base_stat,
      type: stat.stat.name,
    })),
  };

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/pokemons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemonData),
    });
    revalidateTag("pokemons");
    revalidateTag("huntingPokemon");
  } catch (error) {
    return JSON.stringify({ error });
  }
}

export async function getRandomPokemon() {
  try {
    const randomNumber = Math.floor(Math.random() * 898);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomNumber}/`,
      {
        next: { tags: ["huntingPokemon"] },
      }
    );

    const data = await res.json();

    return JSON.stringify(data);
  } catch (error) {
    throw new Error(String(error));
  }
}
