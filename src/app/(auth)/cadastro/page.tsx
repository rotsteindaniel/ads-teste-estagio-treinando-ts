"use client";

import { useState } from "react";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Link from "next/link";

import styles from "./page.module.css";

import LoginCard from "../../../components/cards/logincard/login";
import Input from "../../../components/forms/input/input";
import Button from "../../../components/forms/button/button";

const createUserFormSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "O email é obrigatório" })
    .email({ message: "Campo obrigatório" }),
  password: z
    .string()
    .nonempty({ message: "A senha é obrigatória" })
    .min(6, { message: "Senha curta (menos de 6 caracteres)" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message: "A senha deve conter letras, números e caracteres especiais",
    }),
  name: z.string().nonempty({ message: "A nome completo é obrigatório" }),
  date: z.string().nonempty({ message: "A data de nascimento é obrigatória" }),
  gender: z
    .string()
    .nonempty({ message: "A gênero de nascimento é obrigatória" }),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  function onSubmit({
    email,
    password,
    name,
    date,
    gender,
  }: CreateUserFormData) {
    console.log({ email, password, name, date, gender });
  }

  return (
    <div className={styles.background}>
      <LoginCard title="Crie sua conta">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          <Input
            type="text"
            placeholder="Seu nome e sobrenome"
            name="name"
            register={register}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
          <Input
            type="date"
            placeholder="Seu nome e sobrenome"
            name="date"
            register={register}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date.message}</p>}
          <select {...register("gender")} className={styles.gender}>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Não informar">Não informar</option>
          </select>
          {errors.gender && (
            <p style={{ color: "red" }}>{errors.gender.message}</p>
          )}
          <Button>Cadastrar</Button>
          <Link href="/login">Já possui uma conta?</Link>
        </form>
      </LoginCard>
    </div>
  );
}
