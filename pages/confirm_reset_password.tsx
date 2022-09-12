import { CheckIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import logo from "../app/logo.png";
import Button from "../components/core/Button";
import Loader from "../components/core/Loader";
import Input from "../components/FormInput";
import { useAlert } from "../components/notifications";
import FormPasswordInput from "../components/Password";
import Dialog from "../components/shared/Dialog/Dialog";
import { mpApi } from "../lib/mpApi";

const ConfermaRecuperaPassword = () => {
  const [password, setPassword] = useState("");
  const [confermaPassword, setConfermaPassword] = useState("");
  const [token, setToken] = useState("");

  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const alert = useAlert();

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confermaPassword) {
      setLoading(true);
      mpApi.resetPassword.actions
        .resetPassword(token, password)
        .then((res: any) => {
          console.log("res", res);
          setLoading(false);
          setIsSent(true);
          setMessage(res.message);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      alert({
        id: new Date().toISOString(),
        type: "error",
        title: "Attenzione",
        message: "Le password non corrispondono",
        read: false,
        isAlert: true,
      });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    router.push("/login");
  };

  useEffect(() => {
    if (isSent) {
      setOpenDialog(true);
    }
  }, [isSent]);

  useEffect(() => {
    if (router.query.token) {
      setToken(router.query.token as string);
    }
  }, [router.query, router.query.token]);

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="relative mt-16 w-full rounded bg-white  p-10 shadow md:w-1/2 lg:w-1/3">
        <Image src={logo} />
        <p tabIndex={0} role="heading" aria-label="Area riservata" className="mb-4 text-2xl font-extrabold leading-6 text-gray-800">
          Area riservata
        </p>

        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <FormPasswordInput
            name="password"
            aria="recupera password"
            label="Nuova Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormPasswordInput
            name="conferma_password"
            aria="conferma password"
            label="Conferma Password"
            value={confermaPassword}
            onChange={(e) => setConfermaPassword(e.target.value)}
          />

          <Button className="w-full py-4" title={"Invia"} aria="invia recupera password" type="submit" disabled={isSent} />
        </form>

        <div className="absolute top-5 right-5 h-10 w-10">
          {loading && <Loader className="h-full w-full" />} {isSent && <CheckIcon className="h-full w-full text-green-600" />}
        </div>
      </div>

      <Dialog title={""} onClose={() => handleCloseDialog()} isOpen={openDialog}>
        <p className="font-medium text-gray-800">{message}</p>
      </Dialog>
    </div>
  );
};

export default ConfermaRecuperaPassword;
