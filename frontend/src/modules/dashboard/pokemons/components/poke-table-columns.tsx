"use client";

import { Button } from "@/components/ui/button";
import { Pokemon, UserPokemon } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import moment from "moment";
import { DeletePokemon } from "./delete-pokemon";
import { EditPokemon } from "./edit-pokemon";
import { ViewStatus } from "./view-status";

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
    header: "Experiência",
    size: 70,
    cell: ({ row }) => {
      return <span>{row.original.base_experience.toString()}</span>;
    },
  },
  {
    accessorKey: "captured_at",
    header: "Capturado em",
    size: 80,
    cell: ({ row }) => {
      return (
        <span>
          {moment(row.original.captured_at)
            .format("DD/MM/YYYY H:mm:ss")
            .toString() || "-"}
        </span>
      );
    },
  },
  {
    accessorKey: "stats",
    header: "Stats",
    size: 250,
    cell: ({ row }) => {
      return <ViewStatus fullData={row.original} />;
    },
  },

  {
    id: "actions",
    size: 140,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center space-x-4">
          <EditPokemon fullData={row.original} id={row.original.id} />
          <DeletePokemon name={row.original.name} id={row.original.id} />
        </div>
      );
    },
  },
];
