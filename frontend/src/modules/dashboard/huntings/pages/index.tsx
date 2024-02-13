import { getNewPokemon } from "../actions";
import { PokeBall } from "../components/poke-ball";
import { getRandomPokemon } from "../services";

export default async function HuntingPage() {
  const huntedPokemon = await getRandomPokemon();

  return (
    <div className="hunting h-screen justify-center flex items-end pb-2 relative">
      <div className="flex items-center justify-center mb-16">
        {huntedPokemon && (
          <PokeBall huntedPokemon={JSON.parse(huntedPokemon)} />
        )}
      </div>
    </div>
  );
}
