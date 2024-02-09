import { TargetPokemon } from "../components/locked-pokemon";
import { PokeBall } from "../components/poke-ball";

export default function HuntingPage() {
  return (
    <div className="hunting h-screen justify-center flex items-end pb-2 relative">
      <div className="flex items-center justify-center mb-16">
        <PokeBall />
      </div>
    </div>
  );
}
