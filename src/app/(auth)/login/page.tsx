"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import * as z from "zod";

import Link from "next/link";

import styles from "./page.module.css";

import LoginCard from "../../../components/cards/logincard/login";
import Input from "../../../components/forms/input/input";
import Button from "../../../components/forms/button/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type SignInData = {
  email: string;
  password: string;
};

const loginUserFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "O email é obrigatório" })
    .email({ message: "Campo obrigatório" }),
  password: z.string().nonempty({ message: "A senha é obrigatória" }),
});

type loginUserFormData = z.infer<typeof loginUserFormSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormSchema),
  });

  const router = useRouter();

  async function handleSignIn({ email, password }: SignInData) {
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    console.log("[LOGIN_RESPONSE]: ", response);
    router.replace("/perfil");
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Faça seu login">
        <form className={styles.form} onSubmit={handleSubmit(handleSignIn)}>
          <Input
            type="e-mail"
            placeholder="Seu e-mail"
            name="email"
            register={register}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <Input
            type="password"
            placeholder="Sua senha"
            name="password"
            register={register}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <Button>Entrar</Button>
          <Link href="/register" className={styles.cadastro}>
            Não possui uma conta?
          </Link>
        </form>
      </LoginCard>
    </div>
  );
}
