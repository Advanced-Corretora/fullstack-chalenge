"use client";

import SideNavbar from "@/components/side-navbar/page";
import Image from "next/image";
import IconPokemon from "../../../public/img-pokemon-pokedex.svg";
import Pokemons from "@/components/pokemons-list/page";

export default function Dashboard() {
  return (
    <>
      <div className="flex col-span-2 min-h-screen gap-2">
        <div className="w-[306px]">
          <Image
            src={IconPokemon}
            width={200}
            alt="Imagem Logo"
            className="mt-5 mx-auto"
          />
          <div className="mt-8 ml-2">
            <SideNavbar />
          </div>
        </div>
        <div className="border-2 w-screen bg-[#FAFBFF]">
          <Pokemons />
        </div>
      </div>
    </>
  );
}
