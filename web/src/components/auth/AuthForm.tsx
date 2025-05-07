"use client";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useAuthContext } from "@/hooks/useAuthContext";
import { User } from "@/types/types";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

interface AuthFormProps {
  typeAuth: "signin" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ typeAuth }) => {
  const { register, handleSubmit, formState } = useForm<User>();
  const { errors } = formState;

  const { textErr, auth, setErr } = useAuthContext();

  const onSubmit = (data: User) => {
    auth(data);
  };

  const styles = {
    block: "flex flex-col ",
    label: "flex-1/2 mb-2 font-bold mt-6 text-gray-800",
    input: "flex-1/2 border-b-1 border-gray-800 outline-none text-gray",
    error: "text-red-500 text-sm text-center",
  };

  const {ta,tb,tm} = useAppTranslation()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 rounded shadow max-w-180 mx-auto"
      onFocus={() => setErr("")}
    >
      {typeAuth === "signup" && (
        <div className={styles.block}>
          <label className={`${styles.label} mt-0`} htmlFor="name">
            {ta("enterName")}
          </label>
          <input
            className={styles.input}
            type="text"
            placeholder={ta("placeholderName")}
            {...register("name", { required: tm("required") })}
          />
          <p className={styles.error}>{errors.name?.message}</p>
        </div>
      )}

      <div className={styles.block}>
        <label className={styles.label} htmlFor="email">
          {ta("enterEmail")}
        </label>
        <input
          className={styles.input}
          type="email"
          placeholder={ta("placeholderEmail")}
          {...register("email", { required: tm("required") })}
        />
        <p className={styles.error}>{errors.email?.message}</p>
      </div>
      <div className={styles.block}>
        <label htmlFor="password" className={styles.label}>
          {ta("enterPass")}
        </label>
        <input
          className={styles.input}
          type="password"
          placeholder={ta("placeholderPass")}
          {...register("password", { required: tm("required") })}
        />
        <p className={styles.error}>{errors.password?.message}</p>
      </div>
      <button
        className="block mx-auto mt-10 py-2 px-4 rounded bg-[#daa520] text-white cursor-pointer hover:bg-amber-100 hover:text-gray-900 active:bg-amber-50"
        type="submit"
      >
        {typeAuth === "signup" ? tb("signUp") : tb("signIn")}
      </button>
      <p className="mt-6 mb-4 text-red-500 text-center">{textErr} </p>
      <p>
        {ta("haveAccount")}
        <Link
          href={typeAuth === "signup" ? "/signin" : "/signup"}
          className="text-blue-500 cursor-pointer underline"
        >
          <span >
            {typeAuth === "signup" ? tb("signIn") : tb("signUp")}
          </span>
        </Link>
      </p>
    </form>
  );
};

export default AuthForm;
