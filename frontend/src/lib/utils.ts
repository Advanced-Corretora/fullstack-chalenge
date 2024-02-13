import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FaHome, FaUser } from "react-icons/fa";
import { MdCatchingPokemon } from "react-icons/md";
import { FaBookJournalWhills } from "react-icons/fa6";
import { GiBattleAxe } from "react-icons/gi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SidebarItems = [
  {
    Name: "Home",
    to: "/",
    Icon: FaHome,
  },
  {
    Name: "Meus Pokémons",
    to: "/pokemons",
    Icon: FaBookJournalWhills,
  },
  {
    Name: "Caçar Pokémons",
    to: "/huntings",
    Icon: MdCatchingPokemon,
  },
  {
    Name: "Batalha Pokémon",
    to: "/battle",
    Icon: GiBattleAxe,
  }
];
