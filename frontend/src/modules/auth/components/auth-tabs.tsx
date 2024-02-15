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
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function AuthTabs() {
  const { toast } = useToast();
  const [tabs, setTabs] = useState("login");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  router.prefetch("/");

  async function handleLogin(data: FormData) {
    setLoading(true);
    try {
      const user = await signIn("credentials", {
        redirect: false,
        email: data.get("email")?.toString(),
        password: data.get("password")?.toString(),
      });

      if (user?.ok === true) {
        router.push("/");
        setLoading(false);
        return toast({
          title: "Bem-vindo de volta!",
          description: "Você será redirecionado para o Dashboard.",
        });
      } else {
        setLoading(false);
        return toast({
          title: "Erro ao fazer login!",
          description: "Verifique suas credenciais e tente novamente.",
        });
      }
    } catch (error) {
      setLoading(false);
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
      setLoading(true);
      const res = await RegisterRequest(finalData);

      if (res?.success === true) {
        setTabs("login");
        setLoading(false);
        return toast({
          title: "Conta criada com sucesso!",
          description: "Você já pode fazer login.",
        });
      } else {
        setLoading(false);
        return toast({
          title: "Erro ao criar conta!",
          description: "Tente novamente mais tarde.",
        });
      }
    } catch (error) {
      setLoading(false);

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
          Login
        </TabsTrigger>
        <TabsTrigger onClick={() => setTabs("register")} value="register">
          Registro
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Bem-vindo ao Dashboard de Caça aos Pokémons! Por favor, insira
              suas credenciais para acessar:
            </CardDescription>
          </CardHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(new FormData(e.target as HTMLFormElement));
            }}
          >
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
              <Button className="flex items-center gap-2" disabled={loading}>
                {loading && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
                Entrar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Registro</CardTitle>
            <CardDescription>
              Junte-se à nossa comunidade de treinadores! Registre-se abaixo:
            </CardDescription>
          </CardHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister(new FormData(e.target as HTMLFormElement));
            }}
          >
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
              <Button
                type="submit"
                className="flex items-center gap-2"
                disabled={loading}
              >
                {loading && (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                )}
                Cadastrar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
