
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FaHome, FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdCatchingPokemon } from "react-icons/md";

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
    Name: "Perfil",
    to: "/profile",
    Icon: FaUser
  
  },
  {
    Name: "Ajustes",
    to: "/settings",
    Icon: FiSettings,
  },
  {
    Name: "Caça Pokémons",
    to: "/huntings",
    Icon: MdCatchingPokemon,
  },
];
