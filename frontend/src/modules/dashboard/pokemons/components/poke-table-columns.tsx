"use client";

import { Button } from "@/components/ui/button";
import { Pokemon, UserPokemon } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import moment from "moment";
import { DeletePokemon } from "./delete-pokemon";

export const columns: ColumnDef<UserPokemon>[] = [
  {
    accessorKey: "image",
    size: 70,
    header: "Imagem",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {!row.original.image ? (
            <Image
              src="/locked-pokemon.png"
              width={60}
              height={60}
              alt={row.original.name}
              className="w-16 h-16"
            />
          ) : (
            <Image
              src={row.original.image}
              width={60}
              height={60}
              alt={row.original.name}
              className="w-16 h-16"
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    size: 150,
    header: "Nome",
  },
  {
    accessorKey: "base_experience",
    header: "Experiência Base",
    size: 70,
  },
  {
    accessorKey: "captured_at",
    header: "Capturado em",
    size: 80,
    cell: ({ row }) => {
      return (
        <span>
          {moment(row.original.captured_at).format("DD/MM/YYYY H:mm:ss") || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "stats",
    header: "Stats",

    size: 250,
    cell: ({ row }) => {
      return (
        <div className="flex gap-6 overflow-y-auto min-w-[800px]">
          {row.original.stats.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex bg-zinc-200 p-2 rounded-lg text-black"
              >
                <span>
                  {item.type}: {item.base_stat}
                </span>
              </div>
            );
          })}
        </div>
      );
    },
  },

  {
    id: "actions",
    size: 140,

    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-4">
          <Button variant="secondary">Edit</Button>
          <DeletePokemon id={row.original.id} />
        </div>
      );
    },
  },
];
