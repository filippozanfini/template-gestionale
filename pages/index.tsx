import SidebarLayout from "../layouts/SidebarLayout";
import { NextPageWithLayout } from "./_app";
import { ReactElement, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Quote } from "../models/Quote";
import { Order } from "../models/Order";
import { Service } from "../models/Service";
import { Installation } from "../models/Installation";
import { Package } from "../models/Package";
import { Customer } from "../models/Customer";
import { useCollaborators, useCustomers, useInstallations, useOrders, usePackages, useQuotes, useServices } from "../lib/mpApi";

const MiniCard = (props: any) => {
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(props.path)}
      className="group h-[150px] w-[20%] cursor-pointer flex-col justify-center rounded-xl bg-zinc-500 p-6 shadow-2xl transition-all duration-500 hover:scale-105"
    >
      <p className="text-bold text-2xl font-bold text-white/70">{props.count}</p>
      <p className="text-bold text-2xl font-bold text-white">{props.title}</p>
      <ArrowRightIcon
        width={25}
        height={25}
        className="mt-2 ml-auto flex animate-pulse text-transparent transition-colors group-hover:text-white"
      />
    </div>
  );
};

const ListCard = (props: any) => {
  return (
    <div className={["mt-0 flex flex-col gap-4 rounded-lg p-3", props.bgColor].join(" ")}>
      <div className="flex items-center justify-between">
        <p className={["font-semibold", props.textColor].join(" ")}>{props.id}</p>
        <p className={["font-semibold", props.textColor].join(" ")}>{props.name}</p>
        <p className={["font-semibold", props.textColor].join(" ")}>{props.costo}€</p>
      </div>
    </div>
  );
};

const Home: NextPageWithLayout = () => {
  const { push } = useRouter();
  const orders = useOrders({ page: 1, limit: 4, status: "", orderBy: "", query: "" });
  const quotes = useQuotes({ page: 1, limit: 4, query: "" });
  const services = useServices();
  const installations = useInstallations({ page: 1, limit: 1, query: "" });
  const packages = usePackages({ page: 1, limit: 1, query: "" });
  const collaborators = useCollaborators({ page: 1, limit: 1, query: "" });
  const customers = useCustomers({ page: 1, limit: 1, query: "" });

  return (
    <div className="mt-5 flex flex-col gap-4 rounded-xl bg-white p-20">
      <h3 className="text-5xl font-bold leading-6 text-gray-900">Dashboard</h3>

      <div className="mt-10 flex justify-between gap-5">
        <div
          onClick={() => push("/preventivi")}
          className="group h-[500px] w-[35%] cursor-pointer flex-col justify-center rounded-xl bg-gray-800 p-10 shadow-2xl transition-all duration-500 hover:scale-105"
        >
          <p className="text-bold text-2xl font-bold text-white">Ultimi preventivi</p>
          <div className="mt-5 flex items-center justify-between p-3  ">
            <p className={["font-semibold text-white"].join(" ")}>ID</p>
            <p className={["font-semibold text-white"].join(" ")}>Nome</p>
            <p className={["font-semibold text-white"].join(" ")}>Costo</p>
          </div>
          <div className="flex flex-col gap-3">
            {quotes.data?.content.map((item: Quote) => {
              return (
                <div key={item.id}>
                  <ListCard
                    id={item.id}
                    name={item.utente.nome + " " + item.utente.cognome}
                    costo={item.costo}
                    textColor="text-gray-300"
                    bgColor="bg-gray-700"
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex w-full items-end justify-start">
            <div className="flex items-center gap-3 opacity-0 transition-opacity group-hover:animate-pulse group-hover:opacity-100">
              <p className="text-lg font-semibold text-white">Vedi tutti i preventivi</p>
              <ArrowRightIcon width={25} height={25} className="flex text-transparent transition-colors group-hover:text-white" />
            </div>
          </div>
        </div>
        <div
          onClick={() => push("/ordini")}
          className="group max-h-[500px] w-[65%] cursor-pointer flex-col justify-center rounded-xl bg-primary-700 p-10 shadow-2xl transition-all duration-500 hover:scale-105"
        >
          <p className="text-bold text-right text-2xl font-bold text-white">Ultimi ordini</p>
          <div className="mt-5 flex items-center justify-between p-3  ">
            <p className={["font-semibold text-white"].join(" ")}>ID</p>
            <p className={["font-semibold text-white"].join(" ")}>Nome</p>
            <p className={["font-semibold text-white"].join(" ")}>Totale</p>
          </div>
          <div className="flex flex-col gap-3">
            {orders.data?.content.map((item: Order) => {
              return (
                <div key={item.id}>
                  <ListCard
                    id={item.id}
                    name={item.utente.nome + " " + item.utente.cognome}
                    costo={item.importo}
                    textColor="text-primary-100"
                    bgColor="bg-primary-600"
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex w-full items-end justify-end">
            <div className="flex items-center gap-3 opacity-0 transition-opacity group-hover:animate-pulse group-hover:opacity-100">
              <p className="text-lg font-semibold text-white">Vedi tutti gli ordini</p>
              <ArrowRightIcon width={25} height={25} className="flex text-transparent transition-colors group-hover:text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <MiniCard title="Servizi" count={services.data?.totalItems} path="/servizi" />
        <MiniCard title="Impianti" count={installations.data?.totalItems} path="/impianti" />
        <MiniCard title="Pacchetti" count={packages.data?.totalItems} path="/pacchetti" />
        <MiniCard title="Collaboratori" count={collaborators.data?.totalItems} path="/collaboratori" />
        <MiniCard title="Clienti" count={customers.data?.totalItems} path="/clienti" />
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Dashboard">{page}</SidebarLayout>;
};

export default Home;
