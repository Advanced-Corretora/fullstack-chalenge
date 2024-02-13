import React, { useState, useEffect } from "react";
import Image from "next/image";
import SelectPokemon from "../pokemon-filter/select/page";
import LoadingSpinner from "../ui/spinner";

interface PokemonDetails {
  name: string;
  image: string;
  types: string[];
  weight: number;
  height: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetcher(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const promises = response.results.map(
        async (pokemon: { name: string; url: string }) => {
          const details = await fetcher(pokemon.url);
          return {
            name: pokemon.name.toUpperCase(),
            image: details.sprites.front_default,
            types: details.types.map(
              (type: { type: { name: string } }) => type.type.name
            ),
            weight: details.weight,
            height: details.height,
          };
        }
      );
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
    };

    fetchPokemons();
  }, []);

  return (
    <>
      {/* Started div header */}
      <div className="ml-[70px] w-[1350px] mt-7 flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-[18px]">Pokemons</h1>
          <span className="text-[#71717A] font-normal text-[14px]">
            Todos Pokemons
          </span>
        </div>
        <div>
          <SelectPokemon />
        </div>
      </div>
      {/* Started div pokemons */}
      <div className="bg-gray-300 h-[1px] w-full max-w-[1350px] ml-[70px] mt-4"></div>
      {loading ? (
        <div className="flex justify-center items-center h-[600px]">
          <div className="flex">
            <LoadingSpinner />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 w-[1350px] ml-[70px] mt-2">
          {pokemons.map((pokemon, index) => (
            <div
              key={index}
              className="border shadow-lg bg-white p-5 rounded-2xl w-full max-w-[250px] mt-[24px]"
            >
              <Image
                width={100}
                height={100}
                src={pokemon.image}
                alt={pokemon.name}
                className="mx-auto" // Centraliza a imagem
              />
              <div className="w-[200px] bg-slate-200 h-[1px] mt-2"></div>
              <div className="text-center mt-3">
                <h3 className="text-sm font-bold">{pokemon.name}</h3>
                <p className="text-sm">Types: {pokemon.types.join(", ")}</p>
                <p className="text-sm">Weight: {pokemon.weight}</p>
                <p className="text-sm">Height: {pokemon.height}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PokemonList;
