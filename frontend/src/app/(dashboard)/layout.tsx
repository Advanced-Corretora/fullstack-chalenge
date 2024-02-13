import Sidebar from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Pokedash - Dashboard",
  description: "Pokedash um dashboard para gerenciar seus pokemons",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="flex-col lg:flex-row lg:pt-0 flex h-[100dvh] overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 pt-8 lg:pt-0 lg:px-0 overflow-y-auto">{children}</main>
    </div>
  );
}
