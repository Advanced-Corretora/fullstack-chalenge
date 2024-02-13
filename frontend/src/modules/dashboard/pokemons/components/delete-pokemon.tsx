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
import { useToast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function DeletePokemon({ id, name }: { id: number; name: string }) {
  const { data } = useSession();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deletePokemon(
        (data?.user as { _id: string })?._id,
        id
      );

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Pokemon deletado com sucesso!",
        });
        setLoading(false);
        setOpen(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Erro",
        description: "Falha ao deletar pokemon!",
      });
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
          <Button
            disabled={loading}
            type="button"
            onClick={() => handleDelete()}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            Sim
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
