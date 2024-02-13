import { Session, getServerSession } from "next-auth";
import { SelectPokemon } from "../components/select-pokemon";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Battle } from "../components/battle";

async function getData(session: Session | null | undefined) {
  const pokemons = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${
      (session?.user as { _id: string })?._id
    }/pokemons`,
    {
      next: { tags: ["pokemons"] },
    }
  );

  if (!pokemons.ok) {
    throw new Error("Failed to fetch data");
  }

  return pokemons.json();
}

export default async function BattlePage() {
  const session: Session | null = await getServerSession(authOptions);

  const userPokemons = await getData(session);
  const random = Math.floor(Math.random() * 867) + 1;
  const opponentPokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${random}`,
    {
      next: { tags: ["opponent"] },
    }
  ).then((res) => res.json());
  return (
    <Battle userPokemons={userPokemons} opponentPokemon={opponentPokemon} />
  );
}
