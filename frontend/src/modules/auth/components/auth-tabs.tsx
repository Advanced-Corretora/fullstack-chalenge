"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { RegisterRequest } from "../services";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthTabs() {
  const { toast } = useToast();
  const [tabs, setTabs] = useState("login");
  const router = useRouter();
  async function handleLogin(data: FormData) {
    try {
      const user = await signIn("credentials", {
        redirect: false,
        email: data.get("email")?.toString(),
        password: data.get("password")?.toString(),
      });

      if (user?.ok === true) {
        router.push("/");
        return toast({
          title: "Bem-vindo de volta!",
          description: "Você será redirecionado para o Dashboard.",
        });
      } else {
        return toast({
          title: "Erro ao fazer login!",
          description: "Verifique suas credenciais e tente novamente.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer login!",
        description: "Tente novamente mais tarde.",
      });
    }
  }

  async function handleRegister(data: FormData) {
    const finalData = {
      username: data.get("name")?.toString(),
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    };
    try {
      const res = await RegisterRequest(finalData);

      if (res?.success === true) {
        data.delete("password");
        data.delete("name");
        data.delete("email");
        setTabs("login");
        return toast({
          title: "Conta criada com sucesso!",
          description: "Você já pode fazer login.",
        });
      } else {
        data.delete("password");
        data.delete("name");
        data.delete("email");
        return toast({
          title: "Erro ao criar conta!",
          description: "Tente novamente mais tarde.",
        });
      }
    } catch (error) {
      data.delete("password");
      data.delete("name");
      data.delete("email");

      return toast({
        title: "Erro ao criar conta!",
        description: "Tente novamente mais tarde.",
      });
    }
  }

  return (
    <Tabs value={tabs} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger onClick={() => setTabs("login")} value="login">
          Entrar
        </TabsTrigger>
        <TabsTrigger onClick={() => setTabs("register")} value="register">
          Registrar
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Bem-vindo ao Dashboard de Caça aos Pokémons! Por favor, insira
              suas credenciais para acessar:
            </CardDescription>
          </CardHeader>
          <form action={handleLogin}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email-input">Email</Label>
                <Input
                  id="email-input"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password-input">Senha</Label>
                <Input
                  name="password"
                  id="password-input"
                  autoComplete="current-passowrd"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Entrar</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Registrar</CardTitle>
            <CardDescription>
              Junte-se à nossa comunidade de treinadores! Registre-se abaixo:
            </CardDescription>
          </CardHeader>
          <form action={(e) => handleRegister(e)}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Nome</Label>
                <Input name="name" id="name" type="text" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email-register">Email</Label>
                <Input name="email" id="email-register" type="email" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password-register">Senha</Label>
                <Input
                  name="password"
                  autoComplete="current-password"
                  id="password-register"
                  type="password"
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit">Cadastrar</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
