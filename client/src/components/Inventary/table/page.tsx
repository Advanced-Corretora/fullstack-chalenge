import { MdCatchingPokemon } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { listpokemon } from "../table/listpokemon/page";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableDemo() {
  return (
    <>
      <div className="w-full flex-col justify-center">
        <div className="w-[1350px] ml-[80px] mt-2">
          <Table>
            <TableCaption className="font-semibold">
              Lista de Pokemons Atualizada!
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Pokemons</TableHead>
                <TableHead>Types</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Height</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listpokemon.map((listpokemon) => (
                <TableRow key={listpokemon.Avatar}>
                  <TableCell className="font-medium w-[200px]">
                    {listpokemon.Avatar}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    {listpokemon.Types}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    {listpokemon.Weight}
                  </TableCell>
                  <TableCell className="w-[700px]">
                    {listpokemon.Height}
                  </TableCell>
                  <TableCell className="flex justify-end cursor-pointer w-12">
                    <MdDelete className="w-7 h-7" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </>
  );
}
