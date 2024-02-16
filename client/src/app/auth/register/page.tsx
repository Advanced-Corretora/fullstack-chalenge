"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ImgPokemon from "../../../../public/img-pokemon-pokedex.svg";
import ImgAsh from "../../../../public/img-ash.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Usuário registrado com sucesso");
        router.push("/auth/login");
      } else {
        alert("Erro ao registrar usuário");
      }
    } catch (error) {
      alert("Erro ao enviar formulário");
    }
  };

  return (
    <main className="flex min-h-screen flex-row items-center bg-slate-100">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center min-h-screen w-[1000px] bg-gradient-to-bl from-[#C0F2E9] via-[#F6C093] to-[#C4D5FA] border-slate-300 border-r-2">
        <div className="pl-10">
          <Image src={ImgPokemon} width={400} alt="Logo Pokemon Tela Auth" />
        </div>
        <div>
          <Image src={ImgAsh} width={250} alt="Ash" />
        </div>
      </div>
      {/* Right Side */}
      <div className="ml-28 flex flex-col justify-start items-center w-[670px] min-h-screen">
        <div className="w-full flex justify-end h-60 mt-5">
          <Button variant="link" onClick={() => router.push("/auth/login")}>
            Login
          </Button>
        </div>
        <div className=" w-[400px] h-[430px]">
          <div className="text-center">
            <h1 className="font-semibold text-[24px]">Create Account</h1>
            <p className="font-normal text-[12px] text-[#64748B]">
              Enter your name, email and password below to create your account
            </p>
          </div>
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="text" className="text-[14px] font-semibold">
                  Name
                </Label>
                <Input
                  className="rounded-[6px] border-[#E2E8F0] mt-2 font-medium text-[14px] px-4 w-full"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-3">
                <Label htmlFor="email" className="text-[14px] font-semibold">
                  Email
                </Label>
                <Input
                  className="rounded-[6px] border-[#E2E8F0] mt-2  px-4 w-full focus:font-semibold  focus:text-[14px]"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                />
              </div>
              <div className="mt-3">
                <Label htmlFor="password" className="text-[14px] font-semibold">
                  Password
                </Label>
                <Input
                  className="rounded-[6px] border-[#E2E8F0] mt-2 font-medium text-[14px] px-4 w-full"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="bg-[#18181B] hover:bg-[#18181bda] rounded-[6px] text-white w-full mt-6"
              >
                Create account
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
