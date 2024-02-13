"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { SidebarItems } from "@/lib/utils";
import { FaArrowLeft, FaArrowRight, FaMoon, FaSun } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import Header from "./header";
import { useTheme } from "next-themes";

const footerItens = [
  {
    to: "/",
    Name: "Sair",
    onclick: async () => {
      await signOut();
    },
    Icon: FiLogOut,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  const [open, setOpen] = useState(true);

  return (
    <>
      <motion.aside
        className="hidden sidebar lg:flex h-dvh flex-col z-50 "
        initial={{ width: open ? "15.5rem" : "7rem" }}
        animate={{ width: open ? "15.5rem" : "7rem" }}
        exit={{ width: open ? "15.5rem" : "7rem" }}
        transition={{ duration: 0.3 }}
      >
        <nav className="bg-alpha_White flex flex-col gap-4 flex-1 justify-between relative shadow-[4px_4px_7px_0px_rgba(0,_0,_0,_0.26)] px-6 pt-6">
          <menu className="flex flex-col gap-4">
            {SidebarItems.map((item, index) => (
              <Link href={item.to} key={index}>
                <motion.li
                  className={`list-none flex gap-2 items-center cursor-pointer w-full px-4 py-2 rounded-2xl transition-all hover:bg-foreground hover:bg-opacity-5 hover:text-background  ${
                    item.to !== "/" && pathname.startsWith(item.to)
                      ? "bg-black bg-opacity-10"
                      : pathname === "/" && item.to === "/"
                      ? "bg-black bg-opacity-10"
                      : ""
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <motion.div
                    className="px-1"
                    initial={{ opacity: 0, x: open ? -10 : 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    exit={{ opacity: 0, x: open ? -10 : 0 }}
                  >
                    <item.Icon size={23} />
                  </motion.div>
                  {open && (
                    <motion.span
                      className="whitespace-nowrap flex-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.Name}
                    </motion.span>
                  )}
                </motion.li>
              </Link>
            ))}
          </menu>

          <button
            onClick={() => setOpen(!open)}
            className="absolute top-[88px] w-8 h-8 flex items-center justify-center rounded-lg -right-4 p-2 bg-background border border-neutral_4"
          >
            {open ? <FaArrowLeft /> : <FaArrowRight />}
          </button>

          <menu className="flex items-center flex-col pt-8 border-t border-neutral_4">
            {footerItens.map((item, index) => (
              <motion.li
                onClick={item.onclick}
                className="list-none flex gap-2 items-center cursor-pointer w-full px-4 py-4 rounded-2xl "
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <motion.div
                  className="px-2"
                  initial={{ opacity: 0, x: open ? -10 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  exit={{ opacity: 0, x: open ? -10 : 0 }}
                >
                  <item.Icon size={17} />
                </motion.div>
                {open && (
                  <motion.span
                    className="whitespace-nowrap flex-1 text-neutral_4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.Name}
                  </motion.span>
                )}
              </motion.li>
            ))}

            <motion.li
              onClick={() => {
                if (theme === "dark") {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              className="list-none flex gap-2 items-center cursor-pointer w-full px-4 py-4 rounded-2xl "
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="px-2"
                initial={{ opacity: 0, x: open ? -10 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, x: open ? -10 : 0 }}
              >
                <FaSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <FaMoon className="absolute bottom-[1.2rem] h-[0.9rem] w-[0.9rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </motion.div>
              {open && (
                <motion.span
                  className="whitespace-nowrap flex-1 text-neutral_4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  Mudar tema
                </motion.span>
              )}
            </motion.li>
          </menu>
        </nav>
      </motion.aside>

      <Header />
    </>
  );
}
