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
import { FaEdit } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { UserPokemon } from "@/types";
import { useState } from "react";
import { editPokemon } from "../actions";

export function EditPokemon({
  id,
  fullData,
}: {
  id: number;
  fullData: UserPokemon;
}) {
  const { data }: any = useSession();

  const [name, setName] = useState(fullData.name);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await editPokemon(data?.user?._id, name, fullData);

      if (res.ok) {
        alert("Pokemon atualizado com sucesso!");
        setOpen(false);
      }
    } catch (error) {
      alert("Falha ao atualizar pokemon!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaEdit className="text-foreground" size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar {fullData.name}</DialogTitle>
          <DialogDescription>Altere o nome do pokemon.</DialogDescription>
        </DialogHeader>
        <div>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={() => handleDelete()}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
