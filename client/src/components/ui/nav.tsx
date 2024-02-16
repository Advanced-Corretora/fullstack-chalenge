"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface NavLink {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: string;
}

interface NavProps {
  isCollapsed: boolean;
  links: NavLink[];
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      className={`flex flex-col gap-4 py-2 ${
        isCollapsed ? "justify-center" : ""
      }`}
    >
      <nav className="grid gap-2 px-2">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`inline-flex border-b-2 items-center gap-2 p-2 rounded-[5px] transition-colors duration-200 font-semibold ${
              link.variant === "default"
                ? "bg-[#F4F4F5] hover:bg-[#F4F4F5] text-black"
                : "text-black hover:bg-[#F4F4F5]"
            } ${isCollapsed ? "justify-center w-9 h-9" : "w-auto"}`}
          >
            <link.icon className="h-4 w-4" />
            {!isCollapsed && (
              <>
                <span className="text-[15px]">{link.title}</span>
              </>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
}
