import PokemonsPage from "@/modules/dashboard/pokemons/pages";

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Pokemons({ searchParams }: paramsProps) {
  return <PokemonsPage searchParams={searchParams} />;
}
