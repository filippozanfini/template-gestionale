import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { mpApi } from "../../lib/mpApi";
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Button from "../../components/core/Button";
import Dialog from "../../components/shared/Dialog/Dialog";

const ProfiloUtente: NextPageWithLayout = () => {
  const { reload } = useRouter();
  const { mutate } = useSWRConfig();
  const { data: userData, mutate: mutateUser } = useSWR<any>(mpApi.user.routes.me);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="mt-5 flex flex-col justify-center gap-4 rounded-xl bg-white p-20 pt-10">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Profilo</h3>
        <button
          className="flex items-center gap-2 rounded-md bg-red-500 p-3 text-white hover:bg-red-600"
          onClick={() => setShowDialog(true)}
        >
          <ArrowLeftIcon width={20} height={20} />
          Esci
        </button>
      </div>
      <div className="mt-10 flex items-center gap-5">
        <svg className="h-36 w-36 rounded-full bg-gray-100 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <div className="flex flex-col gap-1">
          <p className="text-lg text-gray-500">
            ID: <span className="font-bold text-black">{userData.id}</span>
          </p>
          <p className="text-lg text-gray-500">
            Nome: <span className="font-bold text-black">{userData.nome}</span>
          </p>
          <p className="text-lg text-gray-500">
            Cognome: <span className="font-bold text-black">{userData.cognome}</span>
          </p>
          <p className="text-lg text-gray-500">
            CF: <span className="font-bold text-black">{userData.codiceFiscale}</span>
          </p>
        </div>
      </div>

      <Dialog title={`Sei sicuro di voler uscire?`} isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <div className="mt-6 flex gap-3">
          <Button title="Annulla" aria="" className="w-full bg-gray-500 px-5 py-2" onClick={() => setShowDialog(false)} />
          <Button
            title="Conferma"
            aria=""
            className="w-full bg-red-500 px-5 py-2 outline-hidden outline-red-500 hover:bg-red-600"
            onClick={() => {
              mpApi.user.logout();
              reload();
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};

ProfiloUtente.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Profilo utente">{page}</SidebarLayout>;
};

export default ProfiloUtente;
