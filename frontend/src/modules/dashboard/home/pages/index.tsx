import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { LastPokemons } from "../components/last-pokemons";
import { Session, getServerSession } from "next-auth";

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
    <div className="px-8 pt-8">
      <LastPokemons pokemons={pokemons.user_pokemons} />
    </div>
  );
}
