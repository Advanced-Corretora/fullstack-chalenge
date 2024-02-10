import { Pokemon } from "@/types";

export async function getNewPokemon() {
  try {
    const ramdomNumber = Math.floor(Math.random() * 100) + 1;
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1&offset=${ramdomNumber}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
}

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
    const res = await fetch(`http://localhost:3001/user/${userId}/pokemons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemonData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { error };
  }
}
