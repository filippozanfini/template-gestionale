import React, { useEffect, Fragment, useState } from "react";
import Button from "../components/Button";
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
} from "@heroicons/react/outline";
import { Dialog, Menu, Transition } from "@headlessui/react";
import NavigationMenu, { MenuItem } from "../components/NavigationMenu";
import { useRouter } from "next/router";
import Notifications from "../components/notifications/NotificationsCenter";
import { ArrowLeftIcon } from "@heroicons/react/solid";

function SidebarLayout({ title, children }: any) {
  const [sidebar, setSidebar] = useState(true);
  const { user } = useUser({});
  const [current, setCurrent] = useState("");
  const [userNavigation, setUserNavigation] = useState([
    { name: "Profilo", href: "#" },
    { name: "Impostazioni", href: "#" },
    { name: "Esci", href: "#" },
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
          icon: <DownloadIcon />,
          open: false,
        },
        {
          id: "manutenzione",
          label: "Manutenzione",
          icon: <TicketIcon />,
          children: [],
          category: 10,
        },
        {
          id: "pacchetti",
          label: "Pacchetti",
          icon: <OfficeBuildingIcon />,
          open: false,
        },
        {
          id: "ordini",
          label: "Ordini",
          icon: <OfficeBuildingIcon />,
          open: false,
        },
        {
          id: "collaboratori",
          label: "Collaboratori",
          icon: <StarIcon />,
          open: false,
        },
        { id: "user", label: "Clienti", icon: <UsersIcon />, open: false },
        {
          id: "preventivi",
          label: "Preventivi",
          icon: <LibraryIcon />,
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
          childrenMenu.push({
            id: item.id + "-add",
            label: "Nuovo",
            icon: <DocumentAddIcon />,
            path: '/' + item.id + '/new',
          })
        }
        if (item.category) {
          childrenMenu.push({
            id: item.id + "-category",
            label: "Categorie",
            icon: <ColorSwatchIcon />,
            path: "/" + item.id + "/categories",
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
      { name: "Profilo", href: "#" },
      { name: "Impostazioni", href: "#" },
      { name: "Esci", href: "#" },
    ]);
  }, [user, router]);

  if (!user?.isLoggedIn()) {
    return (
      <div role="status" className="grid h-screen place-items-center">
        <svg
          className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
      <div className={" flex flex-no-wrap"}>
        {/* Sidebar starts */}
        <div
          className={
            'fixed t-0 l-0 text-white bg-primary-800 shadow h-screen flex flex-col justify-start transition-all ease-in-out duration-500'
          }
          style={{
            width: sidebar ? "240px" : "70px",
          }}
        >
          <div className="px-2 py-4 text-center w-full bg-black/40 drop-shadow-md">
            <Image
              className="w-full block-inline mx-auto"
              src={logo}
              layout="responsive"
              objectFit="contain"
              alt="Logo"
            />
          </div>
          <div className="overflow-y-scroll grow">
            <NavigationMenu
              collapsed={!sidebar}
              className="text-white bg-primary-800"
              menu={sezioni}
              selected={current}
              onClick={(item: MenuItem) => {
                if (item.path) {
                  router.push(item.path);
                }
              }}
            />
          </div>
          <div className="grow-0 h-8 w-full bottom-0 right-0 left-0 text-center py-2 bg-black/40">
            <button
              className="w-5 h-5 mx-auto"
              onClick={() => setSidebar(!sidebar)}
            >
              <ChevronDoubleLeftIcon
                className={`${
                  !sidebar ? "transform rotate-180" : ""
                } duration-500 transition ease-in-out`}
              />
            </button>
          </div>
        </div>
        {/* Sidebar ends */}
        <div
          style={sidebar ? { marginLeft: "240px" } : { marginLeft: "70px" }}
          className={
            "w-full h-full relative transition-all ease-in-out duration-500"
          }
        >
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <div className="flex-1 px-4 flex items-center justify-between">
                <div >
                    <h1 className="text-2xl font-semibold text-gray-900"> <button onClick={() => { router.back()} }> <ChevronLeftIcon className="w-5 h-5"/> </button> {title}</h1>
                </div>
              <div className="ml-4 flex items-center md:ml-6">
              <Notifications />
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }: { active: boolean }) => (
                            <a
                              href={item.href}
                              className={[
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              ].join(" ")}
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
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">{children}</div>
                {/* /End replace */}
              </div>
            </div>
          </main>

        </div>
      </div>
    </>
  );
}

export default SidebarLayout;
