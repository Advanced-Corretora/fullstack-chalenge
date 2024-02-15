"use server";

import { UserPokemon } from "@/types";
import { revalidateTag } from "next/cache";

export async function RevalidateOpponent() {
  return revalidateTag("opponent");
}

export async function UpdatePokemonStats(id: string, fullData: UserPokemon) {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${id}/pokemons/${fullData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fullData),
      }
    );
    revalidateTag(`user_${id}_pokemons`); 
  } catch (error) {
    throw new Error("Failed to request");
  }
}
