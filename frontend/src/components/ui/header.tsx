import { cn } from "@/lib/utils";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SidebarItems } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../toggle-theme";

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20 lg:hidden">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={"https://github.com/Kiranism/next-shadcn-dashboard-starter"}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <Sheet>
            <SheetTrigger>
              <RxHamburgerMenu size={25} />
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] sm:w-[540px]">
              <SheetHeader className="h-full">
                <SheetTitle className="text-left">PokeDashboard</SheetTitle>
                <SheetDescription className="flex flex-col h-full gap-2 justify-between">
                  <div>
                    {SidebarItems.map((item, index) => (
                      <Link href={item.to} key={index}>
                        <div className="px-2 py-3 transition-all flex items-start hover:bg-black hover:bg-opacity-15 rounded-lg">
                          <motion.span
                            className="whitespace-nowrap flex-1 text-base text-left"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3, delay: index * 0.2 }}
                          >
                            {item.Name}
                          </motion.span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center justify-center">
                    <button className="px-4 py-2 bg-primary text-background rounded-lg">
                      Logout
                    </button>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>{" "}
        </div>
        <ModeToggle />
      </nav>
    </div>
  );
}
