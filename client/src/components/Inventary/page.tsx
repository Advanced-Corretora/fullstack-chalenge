import { MdCatchingPokemon } from "react-icons/md";
import { Button } from "../ui/button";

import React from "react";
import TableCaptured from "./table-captured/page";

const capturePokemon = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token de autenticação não encontrado");

    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    if (!response.ok) throw new Error("Não foi possível buscar os dados");
    const data = await response.json();

    const randomIndex = Math.floor(Math.random() * data.results.length);
    const pokemonResponse = await fetch(data.results[randomIndex].url);
    if (!pokemonResponse.ok)
      throw new Error("Não foi possível buscar os detalhes do Pokémon");

    const pokemon = await pokemonResponse.json();

    const pokemonDetails = {
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      pokemonType: pokemon.types[0].type.name,
      weight: pokemon.weight,
      height: pokemon.height,
    };

    const captureEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/users/capture`;

    const result = await fetch(captureEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(pokemonDetails),
    });

    if (!result.ok) throw new Error("Falha ao enviar os detalhes do Pokémon");

    window.location.reload();
  } catch (error) {
    console.error("Erro:", error);
  }
};

export default function Inventory() {
  return (
    <>
      <div className="bg-[#FAFBFF] px-4 pt-1 min-h-screen">
        <div className="mt-2">
          <div className="flex justify-end max-w-[1350px] ml-[70px]">
            <Button
              onClick={() => capturePokemon()}
              className="bg-black text-white rounded-xl hover:bg-slate-800 gap-2"
            >
              <MdCatchingPokemon className="text-white w-5 h-5" />
              Caçar Pokémon
            </Button>
          </div>
          <div className="bg-gray-300 h-[1px] w-full max-w-[1350px] ml-[70px] mt-5 flex"></div>
          <div>
            <TableCaptured />
          </div>
        </div>
      </div>
    </>
  );
}
