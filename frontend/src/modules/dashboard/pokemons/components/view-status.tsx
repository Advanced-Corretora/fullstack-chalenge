import { Button } from "@/components/ui/button";
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
import { UserPokemon } from "@/types";

export function ViewStatus({ fullData }: { fullData: UserPokemon }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>Ver status</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Status do pokemon {fullData.name}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 flex-wrap mt-2">
          {fullData.stats.map((stat, index) => (
            <div
              className="bg-foreground text-background px-2 py-2 rounded-md"
              key={index}
            >
              <span className="font-semibold">{stat.type}: </span>
              <span className="font-bold">{stat.base_stat}</span>
            </div>
          ))}
        </div>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
