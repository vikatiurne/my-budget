"use client";
import { ErrorResponse, User } from "@/types/types";
import { login, registration } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface AuthFormProps {
  typeAuth: "signin" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ typeAuth }) => {
  const [textErr, setTextErr] = useState<string>("");

  const { register, handleSubmit, formState } = useForm<User>();
  const { errors } = formState;

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: User) =>
      typeAuth === "signup"
        ? registration(data)
        : login(data.email, data.password),
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        setTextErr(
          `Error ${typeAuth === "signup" ? "registration" : "login"}: ${
            error.response.data.message
          }`
        );
      } else {
        setTextErr(
          `Unknown ${typeAuth === "signup" ? "registration" : "login"} error!`
        );
      }
    },
    onSuccess: (data) => {
      localStorage.setItem("__budget_isAuth", data._id);
      router.push("/");
    },
  });

  const onSubmit = async (data: User) => {
    mutation.mutate(data);
  };

  const styles = {
    block: "flex flex-col ",
    label: "flex-1/2 mb-2 font-bold mt-6 text-gray-800",
    input: "flex-1/2 border-b-1 border-gray-800 outline-none text-gray",
    error: "text-red-500 text-sm text-center",
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 rounded shadow max-w-180 mx-auto"
      onFocus={() => setTextErr("")}
    >
      {typeAuth === "signup" && (
        <div className={styles.block}>
          <label className={`${styles.label} mt-0`} htmlFor="name">
            Enter your name:
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder="Your name..."
            {...register("name", { required: "this field is required" })}
          />
          <p className={styles.error}>{errors.name?.message}</p>
        </div>
      )}

      <div className={styles.block}>
        <label className={styles.label} htmlFor="email">
          Enter your e-mail
        </label>
        <input
          className={styles.input}
          type="email"
          placeholder="Your e-mail..."
          {...register("email", { required: "this field is required" })}
        />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <div className={styles.block}>
        <label htmlFor="password" className={styles.label}>
          Enter your password
        </label>
        <input
          className={styles.input}
          type="password"
          placeholder="Your password..."
          {...register("password", { required: "this field is required" })}
        />
        <p className={styles.error}>{errors.password?.message}</p>
      </div>
      <button
        className="block mx-auto mt-10 py-2 px-4 rounded bg-[#daa520] text-white cursor-pointer hover:bg-amber-100 hover:text-gray-900 active:bg-amber-50"
        type="submit"
      >
        {typeAuth === "signup" ? "Sing Up" : "Sing In"}
      </button>
      <p className="mt-6 text-red-500 text-center">{textErr} </p>
      <p>
        Do you have account?{" "}
        <Link
          href={typeAuth === "signup" ? "/signin" : "/signup"}
          className="text-blue-500 cursor-pointer underline"
        >
          <span>{typeAuth === "signup" ? "sing in" : "sing up"}</span>
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;
