import { FormEvent, ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../app/logo.png";
import Button from "../components/core/Button";
import Input from "../components/FormInput";
import { mpApi } from "../lib/mpApi";
import Dialog from "../components/shared/Dialog/Dialog";
import Loader from "../components/core/Loader";
import { CheckIcon, XIcon } from "@heroicons/react/outline";

const RecuperaPassword = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    mpApi.resetPassword.actions
      .sendEmail(email)
      .then((res: any) => {
        setLoading(false);
        setIsSent(true);
        setMessage(res.message);
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
        setLoading(false);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError(false);
    setMessage("");
  };

  useEffect(() => {
    if (isSent || error) {
      setOpenDialog(true);
    }
  }, [isSent, error]);

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="relative mt-16 w-full rounded bg-white  p-10 shadow md:w-1/2 lg:w-1/3">
        <Image src={logo} />
        <p tabIndex={0} role="heading" aria-label="Area riservata" className="mb-4 text-2xl font-extrabold leading-6 text-gray-800">
          Area riservata
        </p>

        <p className="text-sm">{"Inserisci un'email a cui inviare le istruzioni di recupero password"}</p>

        <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
          <Input
            type="email"
            name="email"
            aria="recupera password"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button className="w-full py-4" title={"Invia"} aria="invia recupera password" type="submit" disabled={isSent} />
        </form>

        <div className="absolute top-5 right-5 h-10 w-10">
          {loading && <Loader className="h-full w-full" />} {isSent && <CheckIcon className="h-full w-full text-green-600" />}
          {error && <XIcon className="h-full w-full text-red-600" />}
        </div>
      </div>

      <Dialog title={""} onClose={() => handleCloseDialog()} isOpen={openDialog}>
        <p className="font-medium text-gray-800">{message}</p>
      </Dialog>
    </div>
  );
};

export default RecuperaPassword;
