import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export default function SelectPokemon() {
  return (
    <>
      <div>
        <Select>
          <SelectTrigger className="w-[180px] border-[#E4E4E7] bg-white rounded-[6px] font-semibold ">
            <SelectValue placeholder="Filtro de Pokemons" />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-[6px] cursor-pointer">
            <SelectItem value="light">Fire</SelectItem>
            <SelectItem value="dark">Bug</SelectItem>
            <SelectItem value="system">Water</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
