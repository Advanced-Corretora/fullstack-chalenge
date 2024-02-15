import { MdCatchingPokemon } from "react-icons/md";
import { Button } from "../ui/button";
import { TableDemo } from "./table/page";

const capturePokemon = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: "email@example.com" }),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Sucesso:", data);
    } else {
      console.error("Falha na resposta do servidor:", response.status);
    }
  } catch (error) {
    console.error("Erro na captura do Pokémon:", error);
  }
};

export default function Inventary() {
  return (
    <>
      <div className="bg-[#FAFBFF] px-4 pt-1">
        <div className="mt-2">
          <div className="flex justify-end max-w-[1350px] ml-[70px]">
            <Button
              onClick={() => capturePokemon()}
              className="bg-black text-white rounded-xl hover:bg-slate-800 gap-2"
            >
              <MdCatchingPokemon className="text-white w-5 h-5" />
              Caçar Pokemon
            </Button>
          </div>
          <div className="bg-gray-300 h-[1px] w-full max-w-[1350px] ml-[70px] mt-5 flex"></div>
        </div>
        <div>
          <TableDemo />
        </div>
      </div>
    </>
  );
}
