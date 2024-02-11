"use server";

import { UserPokemon } from "@/types";
import { revalidateTag } from "next/cache";

export async function editPokemon(
  userId: string | undefined,
  name: string,
  fullData: UserPokemon
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/pokemons/${fullData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...fullData,
          name: name,
        }),
      }
    );

    const item = await response.json();
    revalidateTag("pokemons");

    return item;
  } catch (error) {
    throw new Error("Failed to request");
  }
}

export async function deletePokemon(
  userId: string | undefined,
  pokeId: number
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/pokemons/${pokeId}`,
      {
        method: "DELETE",
      }
    );

    const item = await response.json();

    revalidateTag("pokemons");

    return item;
  } catch (error) {
    throw new Error("Failed to request");
  }
}
