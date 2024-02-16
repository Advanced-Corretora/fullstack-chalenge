import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Pokemon {
  userId: number;
  name: string;
  image: string;
  pokemonType: string;
  weight: number;
  height: number;
}

export default function TableCaptured() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/pokemons`
        );
        if (!response.ok) {
          throw new Error("Falha ao buscar os Pokémon capturados");
        }
        const data = await response.json();
        setPokemons(data);
      } catch (error) {
        console.error("Erro ao carregar Pokémon:", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <>
      <div className="grid grid-cols-5 gap-4 w-[1350px] ml-[70px] mt-2">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <>
              <div
                key={pokemon.userId}
                className="border shadow-lg bg-white p-5 rounded-2xl w-full max-w-[250px] mt-[24px] flex flex-col items-center justify-center"
              >
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <div className="w-[200px] bg-slate-200 h-[1px] mt-2"></div>
                <div className="text-center mt-3">
                  <div>
                    <h1 className="text-sm font-bold">{pokemon.name}</h1>
                    <p className="text-sm">Tipo: {pokemon.pokemonType}</p>
                    <p className="text-sm">Peso: {pokemon.weight}kg</p>
                    <p className="text-sm">Altura: {pokemon.height}m</p>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className="w-[1300px] h-[500px]">
            <h1 className="font-bold text-center h-[500px] mt-[200px]">
              Nenhum Pokémon capturado ainda.
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
