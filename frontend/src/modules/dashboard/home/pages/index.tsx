import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { LastPokemons } from "../components/last-pokemons";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session: any = await getServerSession(authOptions);

  const pokemons = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${session?.user?._id}/pokemons`,
    {
      next: { tags: ["pokemons"] },
    }
  ).then((res) => res.json());

  return (
    <div className="px-8 pt-8">
      <LastPokemons pokemons={pokemons.user_pokemons} />
    </div>
  );
}
