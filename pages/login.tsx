import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import logo from "../app/logo.png";
import Button from "../components/core/Button";
import Input from "../components/FormInput";
import { useAlert } from "../components/notifications";
import FormPasswordInput from "../components/Password";
import fetchJson, { FetchError } from "../lib/fetchJson";
import { mpApi } from "../lib/mpApi";
import useUser from "../lib/useUser";
import { User } from "../models/User";

const Login: NextPage = () => {
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

   const alert = useAlert();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      mutateUser((await mpApi.user.actions.login(event.currentTarget.username.value, event.currentTarget.password.value)) as User);
    } catch (error) {
      if (error instanceof FetchError) {
        alert({
          id: "err-"+ (Math.random() * 1000000),
          type: "error",
          title: "Errore nel login",
          message: error.data.message,
          isAlert: true,
          read: false
        });
      } else {
        const err = error as Error;
        alert({
          id: "err-"+ (Math.random() * 1000000),
          type: "error",
          title: err.name,
          message: err.message,
          isAlert: true,
          read: false
        });
      }
    }
  };

  return (
    <form className="h-screen w-full bg-gradient-to-tl from-green-400 to-primary-900 py-16 px-4" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-16 w-full rounded bg-white  p-10 shadow md:w-1/2 lg:w-1/3">
          <Image src={logo} />
          <p tabIndex={0} role="heading" aria-label="Area riservata" className="mb-4 text-2xl font-extrabold leading-6 text-gray-800">
            Area riservata
          </p>

          <Input type="text" name="username" aria="inserisci la username" label="Username" />
          <FormPasswordInput name="password" aria="inserisci la password" label="Password" className="mt-6  w-full" />

          <div className="mt-8">
            <Button className="w-full py-4" title="Login" aria="Premi per effettuare il login" type="submit" />
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;
