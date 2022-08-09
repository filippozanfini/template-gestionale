import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import useSWR, { useSWRConfig } from "swr";
import { mpApi } from "../../lib/mpApi";
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";

const ProfiloUtente: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: userData, mutate: mutateUser } = useSWR<any>(mpApi.user.routes.me);

  return (
    <div className="mt-5 flex flex-col justify-center gap-4 rounded-xl bg-white p-20 pt-10">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-2xl font-bold leading-6 text-gray-900">Profilo</h3>
        <button className="flex items-center gap-2 rounded-md bg-red-500 p-3 text-white hover:bg-red-600">
          <ArrowLeftIcon width={20} height={20} />
          Esci
        </button>
      </div>
      <div className="mt-10 flex items-center gap-5">
        <svg className="h-36 w-36 rounded-full bg-gray-100 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold">
            ID: <span className="font-normal text-gray-500">{userData.id}</span>
          </p>
          <p className="text-lg font-bold">
            Nome: <span className="font-normal text-gray-500">{userData.nome}</span>
          </p>
          <p className="text-lg font-bold">
            Cognome: <span className="font-normal text-gray-500">{userData.cognome}</span>
          </p>
          <p className="text-lg font-bold">
            CF: <span className="font-normal text-gray-500">{userData.codiceFiscale}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

ProfiloUtente.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Profilo utente">{page}</SidebarLayout>;
};

export default ProfiloUtente;
