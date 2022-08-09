import React, { useEffect, Fragment, useState } from "react";
import Button from "../components/core/Button";
import Head from "next/head";
import useUser from "../lib/useUser";
import logo from "../app/logo-negativo.png";
import Image from "next/image";

import {
  CameraIcon,
  ChevronDoubleLeftIcon,
  ChevronDownIcon,
  ColorSwatchIcon,
  DocumentAddIcon,
  DocumentIcon,
  DownloadIcon,
  LibraryIcon,
  LocationMarkerIcon,
  MapIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  PencilIcon,
  PhotographIcon,
  StarIcon,
  TagIcon,
  TicketIcon,
  UsersIcon,
  ViewListIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  XIcon,
  ChevronLeftIcon,
  UploadIcon,
  ShoppingCartIcon,
  CalculatorIcon,
  ChipIcon,
  CubeIcon,
  UserGroupIcon,
  CollectionIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import NavigationMenu, { MenuItem } from "../components/NavigationMenu";
import { useRouter } from "next/router";
import Notifications from "../components/notifications/NotificationsCenter";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { mpApi } from "../lib/mpApi";
import Dialog from "../components/shared/Dialog/Dialog";

function SidebarLayout({ title, children }: any) {
  const { replace } = useRouter();
  const [sidebar, setSidebar] = useState(true);
  const { user } = useUser({});
  const [showDialog, setShowDialog] = useState(false);
  const [current, setCurrent] = useState("");
  const [userNavigation, setUserNavigation] = useState([
    { name: "Profilo", href: "#" },
    { name: "Impostazioni", href: "#" },
    {
      name: "Esci",
      href: "#",
      onClick: () => setShowDialog(true),
    },
  ]);
  const [sezioni, setSezioni] = useState<MenuItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user && router) {
      let selectedId = "";

      const menu: MenuItem[] = [
        {
          id: "servizi",
          label: "Servizi",
          icon: <CollectionIcon />,
          open: false,
        },
        {
          id: "impianti",
          label: "Impianti",
          icon: <ChipIcon />,
          children: [],
          category: 10,
        },
        {
          id: "pacchetti",
          label: "Pacchetti",
          icon: <CubeIcon />,
          open: false,
          category: 10,
        },
        {
          id: "ordini",
          label: "Ordini",
          icon: <ShoppingCartIcon />,
          open: false,
        },
        {
          id: "collaboratori",
          label: "Collaboratori",
          icon: <UserGroupIcon />,
          open: false,
        },
        {
          id: "clienti",
          label: "Clienti",
          icon: <UsersIcon />,
          open: false,
        },
        {
          id: "preventivi",
          label: "Preventivi",
          icon: <CalculatorIcon />,
          open: false,
        },
      ].map((item: any) => {
        let childrenMenu = [
          {
            id: item.id + "-list",
            label: "Elenco",
            icon: <ViewListIcon />,
            path: "/" + item.id,
          },
        ];

        if (user?.canWrite(item.id)) {
          if (item.id !== "ordini") {
            childrenMenu.push({
              id: item.id + "-add",
              label: "Nuovo",
              icon: <PlusIcon />,
              path: "/" + item.id + "/new",
            });
          }
        }
        if (item.category) {
          childrenMenu.push({
            id: item.id + "-category",
            label: "Categorie",
            icon: <TagIcon />,
            path: "/" + item.id + "/categories",
          });
        }

        if (item.id === "clienti") {
          childrenMenu.push({
            id: item.id + "-importa",
            label: "Importa",
            icon: <UploadIcon />,
            path: "/" + item.id + "/import",
          });
        }

        if (selectedId === "") {
          const selected = childrenMenu.find((itm) => {
            return itm.path === router.pathname;
          });

          if (selected) {
            selectedId = selected.id;
          }
        }
        item.children = childrenMenu;
        return item;
      });
      setCurrent(selectedId);
      setSezioni(menu);
    } else {
      setCurrent("");
      setSezioni([]);
    }

    setUserNavigation([
      { name: "Profilo", href: "/profilo" },
      { name: "Impostazioni", href: "#" },
      {
        name: "Esci",
        href: "",
        onClick: () => setShowDialog(true),
      },
    ]);
  }, [user, router]);

  if (!user?.isLoggedIn()) {
    return (
      <div role="status" className="grid h-screen place-items-center">
        <svg
          className="mr-2 inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Caricamento...</span>
      </div>
    );
  }

  return (
    <>
      <Head key="main">
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={" flex-no-wrap flex"}>
        {/* Sidebar starts */}
        <div
          className={
            "t-0 l-0 fixed flex h-screen flex-col justify-start bg-primary-800 text-white shadow transition-all duration-500 ease-in-out"
          }
          style={{
            width: sidebar ? "240px" : "70px",
          }}
        >
          <div
            className="w-full cursor-pointer bg-black/40 px-2 py-4 text-center drop-shadow-md hover:opacity-90"
            onClick={() => replace("/")}
          >
            <Image className="block-inline mx-auto w-full" src={logo} layout="responsive" objectFit="contain" alt="Logo" />
          </div>
          <div className="grow overflow-y-auto">
            <NavigationMenu
              collapsed={!sidebar}
              className="bg-primary-800 text-white"
              menu={sezioni}
              selected={current}
              onClick={(item: MenuItem) => {
                if (item.path) {
                  router.push(item.path);
                }
              }}
            />
          </div>
          <div className="bottom-0 right-0 left-0 h-8 w-full grow-0 bg-black/40 py-2 text-center">
            <button className="mx-auto h-5 w-5" onClick={() => setSidebar(!sidebar)}>
              <ChevronDoubleLeftIcon className={`${!sidebar ? "rotate-180 transform" : ""} transition duration-500 ease-in-out`} />
            </button>
          </div>
        </div>
        {/* Sidebar ends */}
        <div
          style={sidebar ? { marginLeft: "240px" } : { marginLeft: "70px" }}
          className={"relative h-full w-full transition-all duration-500 ease-in-out"}
        >
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <div className="flex flex-1 items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    router.back();
                  }}
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-900" />
                </button>
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <Notifications />
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1">
                      <svg className="h-8 w-8 rounded-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }: { active: boolean }) => (
                            <a
                              href={item.href !== "" ? item.href : undefined}
                              className={[active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700"].join(" ")}
                              onClick={item.onClick}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">{children}</div>
                {/* /End replace */}
              </div>
            </div>
          </main>
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
                router.reload();
              }}
            />
          </div>
        </Dialog>
      </div>
    </>
  );
}

export default SidebarLayout;
