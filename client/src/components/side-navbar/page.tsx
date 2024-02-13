"use client";
import React from "react";
import { Nav } from "../ui/nav";
import { Package, Cat, CircleEqual, Ghost } from "lucide-react";

type Props = {};

export default function SideNavbar(props: Props) {
  return (
    <div>
      <Nav
        isCollapsed={false}
        links={[
          {
            title: "Meu Inventário",
            icon: Package,
            variant: "ghost",
            href: "/dashboard",
          },
          {
            title: "Pokemons",
            icon: Cat,
            variant: "ghost",
            href: "/pokemons",
          },
        ]}
      />
    </div>
  );
}
