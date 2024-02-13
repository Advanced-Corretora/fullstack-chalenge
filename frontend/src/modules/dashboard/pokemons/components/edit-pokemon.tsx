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
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function EditPokemon({
  fullData,
}: {
  id: number;
  fullData: UserPokemon;
}) {
  const { data } = useSession();
  const { toast } = useToast();

  const [name, setName] = useState(fullData.name);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await editPokemon(
        (data?.user as { _id: string })?._id,
        name,
        fullData
      );

      if (res.ok) {
        toast({
          title: "Sucesso",
          description: "Pokemon atualizado com sucesso!",
        });
        setLoading(false)
        setOpen(false);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        title: "Erro",
        description: "Falha ao atualizar pokemon!",
      });
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
          <Button disabled={loading} type="button" onClick={() => handleDelete()}>
          {loading && <AiOutlineLoading3Quarters className="animate-spin" />}

            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
