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
import { FaTrash } from "react-icons/fa";
import { deletePokemon } from "../actions";
import { useState } from "react";

export function DeletePokemon({ id, name }: { id: number; name: string }) {
  const { data }: any = useSession();

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deletePokemon(data?.user?._id, id);

      if (response.ok) {
        alert("Pokemon deletado com sucesso!");
        setOpen(false);
      }
    } catch (error) {
      alert("Falha ao deletar pokemon!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaTrash color="red" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atenção, Deseja deletar o pokemon {name} ?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
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
