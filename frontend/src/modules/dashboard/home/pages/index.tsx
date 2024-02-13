import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { LastPokemons } from "../components/last-pokemons";
import { Session, getServerSession } from "next-auth";
import { BattleCard } from "../components/battle";
import { HuntPokemonCard } from "../components/hunt-pokemon";
import { RankingTable } from "../components/ranking-table";

export default async function HomePage() {
  const session: Session | null = await getServerSession(authOptions);

  const pokemons = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${(session?.user as { _id: string })?._id}/pokemons`,
    {
      next: { tags: ["pokemons"] },
    }
  )
    .then((res) => res.json())
    .catch(() => {
      return { user_pokemons: [] };
    });

  return (
    <div className="px-8 pt-8 pb-8 flex flex-col gap-6">
      <LastPokemons pokemons={pokemons.user_pokemons} />

      <div className="flex items-center gap-4 flex-wrap">
        <BattleCard/>
        <HuntPokemonCard/>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Ranking de pokemons</h1>
        <RankingTable pokemons={pokemons.user_pokemons}/>
      </div>
    </div>
  );
}
