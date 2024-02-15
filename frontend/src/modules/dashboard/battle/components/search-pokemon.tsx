import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function SearchPokemon() {
  return (
    <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-85 z-[999999999999999] flex items-center justify-center p-4">
      <div className="flex flex-wrap gap-4 items-center justify-center">
      <h1 className="text-white font-bold text-3xl text-center">
        Aguarde, estamos buscando um novo oponente
      </h1>
      <AiOutlineLoading3Quarters size={24} color="#FFF" className="animate-spin" />
      </div>
   
    </div>
  );
}
