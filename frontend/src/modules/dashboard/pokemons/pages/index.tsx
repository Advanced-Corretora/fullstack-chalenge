import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";
import { PokeTable } from "../components/poke-table";
import { columns } from "../components/poke-table-columns";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

async function getData(session: Session | null | undefined) {
  const pokemons = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/user/${(session?.user as { _id: string })?._id}/pokemons`,
    {
      next: { tags: ["pokemons"] },
    }
  );

  if (!pokemons.ok) {
    throw new Error("Failed to fetch data");
  }

  return pokemons.json();
}

export default async function PokemonsPage({ searchParams }: paramsProps) {
  const session: Session | null = await getServerSession(authOptions);

  const pokemons = await getData(session);
  const pageLimit = Number(searchParams.limit) || 10;
  const pageCount = Math.ceil(pokemons.user_pokemons.length / pageLimit);

  return (
    <div className="flex-1 space-y-4 px-4 lg:px-8 pt-8">
      <PokeTable
        data={pokemons.user_pokemons}
        searchKey="name"
        columns={columns}
        pageCount={pageCount}
      />
    </div>
  );
}
