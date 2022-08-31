import SidebarLayout from "../layouts/SidebarLayout";
import { NextPageWithLayout } from "./_app";
import { ReactElement, useState } from "react";
import {
  ArrowRightIcon,
  CalculatorIcon,
  ChipIcon,
  CollectionIcon,
  CubeIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { Quote } from "../models/Quote";
import { Order } from "../models/Order";
import { useCollaborators, useCustomers, useInstallations, useOrders, usePackages, useQuotes, useServices } from "../lib/mpApi";

const MiniCard = (props: any) => {
  const { push } = useRouter();
  const Icon = props.icon;
  return (
    <div
      onClick={() => push(props.path)}
      className="group h-[150px] w-[20%] cursor-pointer flex-col justify-center rounded-xl bg-zinc-600 p-6 shadow-2xl transition-all duration-500 hover:scale-105"
    >
      <div className="flex justify-between">
        <div>
          <p className="text-bold text-2xl font-bold text-white/70">{props.count}</p>
          <a className="text-bold inline-block text-[21px] font-bold text-white transition duration-300">
            {props.title}
            <span className="block h-[3px] max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
          </a>
        </div>
        <Icon width={30} height={30} color="white" />
      </div>
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
      <div className="mt-10 flex justify-between gap-5">
        <div
          onClick={() => push("/preventivi")}
          className="group h-[500px] w-[40%] cursor-pointer flex-col justify-center rounded-xl bg-gray-800 p-10 shadow-2xl transition-all duration-500 hover:scale-105"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-bold text-3xl font-bold text-white/70">{quotes.data?.totalItems}</p>
              <a className="text-bold inline-block text-3xl font-bold text-white transition duration-300">
                Preventivi
                <span className="block h-[3px] max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
              </a>
            </div>
            <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full text-white transition-colors group-hover:bg-white group-hover:text-gray-800">
              <CalculatorIcon width={50} height={50} />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between p-3  ">
            <p className={["font-semibold text-white"].join(" ")}>ID</p>
            <p className={["font-semibold text-white"].join(" ")}>Nome</p>
            <p className={["font-semibold text-white"].join(" ")}>Costo</p>
          </div>
          <div className="flex flex-col gap-3">
            {quotes.data?.content.map((item: Quote, index: number) => {
              const last = quotes.data?.content.length - 1;
              const penultimate = last - 1;
              const thirdLast = penultimate - 1;
              return (
                <div
                  key={item.id}
                  className={[
                    "shadow-2xl",
                    index === last
                      ? "opacity-20 shadow-none"
                      : index === penultimate
                      ? "opacity-40"
                      : index === thirdLast
                      ? "opacity-70"
                      : "opacity-100",
                  ].join(" ")}
                >
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
          <div className="mt-7 flex w-full items-end justify-start">
            <div className="flex items-center gap-3 opacity-0 transition-opacity group-hover:animate-pulse group-hover:opacity-100">
              <p className="text-lg font-semibold text-white text-transparent transition-colors group-hover:text-white">
                Vedi tutti i preventivi
              </p>
              <ArrowRightIcon width={25} height={25} className="flex text-transparent transition-colors group-hover:text-white" />
            </div>
          </div>
        </div>
        <div
          onClick={() => push("/ordini")}
          className="group max-h-[500px] w-[60%] cursor-pointer flex-col justify-center rounded-xl bg-primary-700 p-10 shadow-2xl transition-all duration-500 hover:scale-105"
        >
          <div className="flex w-full justify-between">
            <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full text-white transition-colors group-hover:bg-white group-hover:text-primary-700">
              <ShoppingCartIcon width={50} height={50} />
            </div>
            <div>
              <p className="text-bold text-right text-3xl font-bold text-white/70">{orders.data?.totalItems}</p>
              <a className="text-bold inline-block text-right text-3xl font-bold text-white transition duration-300">
                Ordini
                <span className="block h-[3px] max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
              </a>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between p-3  ">
            <p className={["font-semibold text-white"].join(" ")}>ID</p>
            <p className={["font-semibold text-white"].join(" ")}>Nome</p>
            <p className={["font-semibold text-white"].join(" ")}>Totale</p>
          </div>
          <div className="flex flex-col gap-3">
            {orders.data?.content.map((item: Order, index: number) => {
              const last = orders.data?.content.length - 1;
              const penultimate = last - 1;
              const thirdLast = penultimate - 1;
              return (
                <div
                  key={item.id}
                  className={[
                    "shadow-2xl",
                    index === last
                      ? "opacity-20 shadow-none"
                      : index === penultimate
                      ? "opacity-40"
                      : index === thirdLast
                      ? "opacity-70"
                      : "opacity-100",
                  ].join(" ")}
                >
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
          <div className="mt-7 flex w-full items-end justify-end">
            <div className="flex items-center gap-3 opacity-0 transition-opacity group-hover:animate-pulse group-hover:opacity-100">
              <p className="text-lg font-semibold text-white text-transparent transition-colors group-hover:text-white">
                Vedi tutti gli ordini
              </p>
              <ArrowRightIcon
                width={25}
                height={25}
                className="flex animate-pulse text-transparent transition-colors group-hover:text-white"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <MiniCard title="Servizi" icon={CollectionIcon} count={services.data?.totalItems} path="/servizi" />
        <MiniCard title="Impianti" icon={ChipIcon} count={installations.data?.totalItems} path="/impianti" />
        <MiniCard title="Pacchetti" icon={CubeIcon} count={packages.data?.totalItems} path="/pacchetti" />
        <MiniCard title="Collaboratori" icon={UserGroupIcon} count={collaborators.data?.totalItems} path="/collaboratori" />
        <MiniCard title="Clienti" icon={UsersIcon} count={customers.data?.totalItems} path="/clienti" />
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Dashboard">{page}</SidebarLayout>;
};

export default Home;
