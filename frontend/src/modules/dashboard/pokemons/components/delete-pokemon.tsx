"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DeletePokemon({ id }: { id: number }) {
  const { data } = useSession();

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:3001/user/${data?.user?._id}/pokemons/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Pokemon deletado com sucesso!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Deletar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atenção, Deseja deletar esse pokemon ?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Não
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => handleDelete()}>
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
