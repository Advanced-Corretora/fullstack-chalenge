"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import { SidebarItems } from "@/lib/utils";
import { FaArrowLeft, FaArrowRight, FaMoon } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const footerItens = [
  {
    to: "/",
    Name: "Dark Mode",
    Icon: FaMoon,
  },
  {
    to: "/",
    Name: "Sair",
    Icon: FiLogOut,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [isActiveHome, setIsActiveHome] = useState(pathname === "/");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setIsActiveHome(pathname === "/");
  }, [pathname]);

  return (
    <motion.aside
      className="h-dvh flex flex-col z-50"
      initial={{ width: open ? "15.5rem" : "7rem" }}
      animate={{ width: open ? "15.5rem" : "7rem" }}
      exit={{ width: open ? "16.5rem" : "8rem" }}
      transition={{ duration: 0.3 }}
    >
      <nav className="bg-alpha_White flex flex-col gap-4 flex-1 justify-between relative rounded-tr-[2rem] shadow-[4px_4px_7px_0px_rgba(0,_0,_0,_0.26)] px-6 pt-12">
        <menu className="flex flex-col gap-4">
          {SidebarItems.map((item, index) => (
            <Link href={item.to} key={index}>
              <motion.li
                className={`list-none flex gap-2 items-center cursor-pointer w-full px-4 py-2 rounded-2xl transition-all hover:bg-black hover:bg-opacity-10 hover:text-black  ${
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
          className="absolute top-[88px] w-8 h-8 flex items-center justify-center rounded-lg -right-4 p-2 bg-[#ffff] border border-neutral_4"
        >
          {open ? <FaArrowLeft /> : <FaArrowRight />}
        </button>

        <menu className="flex items-center flex-col pt-8 border-t border-neutral_4">
          {footerItens.map((item, index) => (
            <motion.li
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
        </menu>
      </nav>
    </motion.aside>
  );
}
