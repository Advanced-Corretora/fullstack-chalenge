import { Progress } from "@/components/ui/progress";
import { UserPokemon } from "@/types";
import Image from "next/image";

export function UserSelectedPokemon({
  selectedPokemon,
  hp,
}: {
  selectedPokemon: UserPokemon | null;
  hp: number;
}) {

  return (
    <div>
      {selectedPokemon && (
        <>
          <Progress value={hp} max={selectedPokemon.stats.find((stats) => stats.type === 'hp')?.base_stat} />
          <Image
            src={selectedPokemon?.image || ""}
            alt="Selected pokemon"
            width={200}
            height={200}
          />
        </>
      )}
    </div>
  );
}
