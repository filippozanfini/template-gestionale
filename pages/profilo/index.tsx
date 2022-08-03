import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import useSWR, { useSWRConfig } from "swr";
import { mpApi } from "../../lib/mpApi";
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { useRouter } from "next/router";

const ProfiloUtente: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data: userData, mutate: mutateUser } = useSWR<any>(mpApi.user.routes.me);

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 md:col-span-3 md:mt-0">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-1 bg-white px-0 py-5 sm:p-6">
              <div>
                <p className="mt-2">ID: {userData.id}</p>
                <p className="mt-2">Nome: {userData.nome}</p>
                <p className="mt-">Cognome: {userData.cognome}</p>
                <p className="mt-2">Codice Fiscale: {userData.codiceFiscale}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfiloUtente.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Profilo utente">{page}</SidebarLayout>;
};

export default ProfiloUtente;
