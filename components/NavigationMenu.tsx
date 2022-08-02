import React, { FC, ForwardRefRenderFunction, Fragment, InputHTMLAttributes, LegacyRef, ReactElement, useEffect, useState } from "react";
import { Disclosure, Transition, Popover, Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { usePopper } from "react-popper";
import { createPortal } from "react-dom";
import { Router, useRouter } from "next/router";

export interface MenuItem {
  id: string;
  path?: string;
  label: string;
  icon?: ReactElement | null;
  children?: MenuItem[];
}

interface InternalMenuItem extends MenuItem {
  isOpened: boolean;
  isActive: boolean;
  children?: InternalMenuItem[];
}

export interface NavigationMenuProps {
  menu?: MenuItem[];
  collapsed?: boolean;
  className?: string;
  bgColor?: string;
  textColor?: string;
  selected?: string;
  onClick?: (item: MenuItem) => void;
}

const NavigationMenu: FC<NavigationMenuProps> = ({
  menu = [],
  collapsed = false,
  onClick,
  className,
  selected = "",
  ...otherProps
}): any => {
  const [current, setCurrent] = useState("");
  const [sezioni, setSezioni] = useState<InternalMenuItem[]>([]);

  const aChildIsActive = (menuItems: MenuItem[], selectedItem: string = "") => {
    for (let item of menuItems) {
      if (item.id === selectedItem) {
        return true;
      }
      if (aChildIsActive(item.children || [])) {
        return true;
      }
    }
    return false;
  };

  const processMenu = (menuItems: MenuItem[] | InternalMenuItem[], selectedItem: string = ""): InternalMenuItem[] => {
    let internalMenu: InternalMenuItem[] = [];
    for (let item of menuItems) {
      internalMenu.push({
        ...item,
        isOpened: item.id === selectedItem || aChildIsActive(item.children || [], selectedItem),
        isActive: item.id === selectedItem,
        children: processMenu(item.children || [], selectedItem),
      });
    }
    return internalMenu;
  };

  useEffect(() => {
    setSezioni(processMenu(menu, selected));
    setCurrent(selected);
  }, [menu, selected]);

  const clicked = (item: InternalMenuItem) => {
    if (item.id === current && item.isOpened) {
      //toggled
      setSezioni(processMenu(menu, ""));
      setCurrent("");
    } else {
      setSezioni(processMenu(menu, item.id));
      setCurrent(item.id);

      if (!item.children || item.children?.length === 0) {
        onClick && onClick(item);
      }
    }
  };

  const collpsedStyle = collapsed ? "hidden " : "inline-block ";

  const CollapsibleMenuItem = (props: { menuItem: InternalMenuItem; level: number }) => {
    let [referenceElement, setReferenceElement] = useState();
    let [popperElement, setPopperElement] = useState();
    let { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: "right-start",
      modifiers: [
        {
          name: "arrow",
          options: {
            padding: 5, // 5px from the edges of the popper
          },
        },
      ],
    });
    const icon = props.menuItem.icon ? props.menuItem.icon : props.menuItem.label.substring(0, 1).toUpperCase();
    const hasChildren = props.menuItem && props.menuItem.children;

    const children =
      props.menuItem && props.menuItem.children && props.menuItem?.children?.length > 0 ? (
        <div className={`bg-black/20`}> {recursiveMenuItemRender(props.menuItem.children, props.level + 1)}</div>
      ) : null;

    return (
      <Popover>
        <Popover.Button ref={(item: any) => setReferenceElement(item)} className="w-full text-center hover:bg-white/10">
          <div className="inline-block w-[40px] p-2">{icon}</div>
        </Popover.Button>
        {createPortal(
          <Popover.Panel ref={(item: any) => setPopperElement(item)} style={styles.popper} {...attributes.popper}>
            <div className={["flex flex-col", otherProps.bgColor || "bg-primary-800", otherProps.textColor || "text-white"].join(" ")}>
              <div className="py-4 px-4 hover:bg-white/10">{props.menuItem.label}</div>
              <div>{children}</div>
            </div>
          </Popover.Panel>,
          document.body
        )}
      </Popover>
    );
  };

  const expandedMenuItem = (menuItem: InternalMenuItem, level: number) => {
    const icon = menuItem.icon ? <div className="mr-2 inline-block h-5 w-5"> {menuItem.icon} </div> : null;
    const isOpenedClass = menuItem.isOpened ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0";

    let itemClass = "";
    if (level === 0) {
      itemClass += "px-4 ";
      itemClass += "hover:bg-white/10";
    } else {
      if (menuItem.isActive) {
        itemClass += "bg-white/10 rounded-md pl-6 mx-2 pr-2 ";
      } else {
        itemClass += "hover:bg-white/10 rounded-md pl-6 mx-2 pr-2";
      }

      itemClass += "my-1";
    }

    const children =
      menuItem && menuItem.children && menuItem?.children?.length > 0 ? (
        <div className={`${isOpenedClass} overflow-hidden bg-black/20 transition-all duration-1000 ease-in-out`}>
          {recursiveMenuItemRender(menuItem.children, level + 1)}
        </div>
      ) : null;

    const newImpiantiChildren = [
      {
        key: "caldaia",
        href: "/impianti/caldaia/new",
        name: "Caldaia",
      },
      {
        key: "fotovoltaico",
        href: "/impianti/fotovoltaico/new",
        name: "Fotovoltaico",
      },
      {
        key: "solare-termico",
        href: "/impianti/solare-termico/new",
        name: "Solare termico",
      },
      {
        key: "pompa-di-calore",
        href: "/impianti/pompa-di-calore/new",
        name: "Pompa di calore",
      },
      {
        key: "condizionatore",
        href: "/impianti/condizionatore/new",
        name: "Condizionatore",
      },
    ];

    return (
      <>
        {menuItem.id === "impianti-add" ? (
          <Menu as="div" className="">
            <Menu.Button className="w-full">
              <div className={`${itemClass} align-content-center flex cursor-pointer py-4`}>
                {icon}
                <div>{menuItem.label}</div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute -right-12 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {newImpiantiChildren.map((item: any) => {
                      return (
                        <Menu.Item key={item.key}>
                          {({ active }: { active: boolean }) => (
                            <a
                              href={item.href}
                              className={[active ? "bg-gray-100" : "", "block px-4 py-2 text-left text-sm text-gray-700"].join(" ")}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      );
                    })}
                  </Menu.Items>
                </Transition>
              </div>
            </Menu.Button>
          </Menu>
        ) : (
          <div className={`${itemClass} align-content-center flex cursor-pointer py-4`} onClick={() => clicked(menuItem)}>
            {icon}
            <div>{menuItem.label}</div>
            {menuItem && menuItem.children && menuItem.children.length > 0 ? (
              <div className={collpsedStyle + " ml-auto h-5 w-5"}>
                <ChevronDownIcon
                  className={`${menuItem.id === current ? "rotate-180 transform" : ""} transition duration-500 ease-in-out`}
                />
              </div>
            ) : null}
          </div>
        )}
        {children}
      </>
    );
  };

  const recursiveMenuItemRender = (menuItem: InternalMenuItem[], level: number = 0) => {
    const elements = menuItem.map((item: any) => {
      return (
        <li key={item.id}>
          {collapsed && level == 0 ? <CollapsibleMenuItem menuItem={item} level={level} /> : expandedMenuItem(item, level)}
        </li>
      );
    });
    return <ul>{elements}</ul>;
  };

  return (
    <div className={[className, otherProps.bgColor || "bg-primary-800", otherProps.textColor || "white"].join(" ")}>
      {recursiveMenuItemRender(sezioni)}
    </div>
  );
};
export default NavigationMenu;
