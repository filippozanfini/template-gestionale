import React, { Fragment, useEffect, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { NotificationCenterItem, useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { BellIcon, TrashIcon } from "@heroicons/react/outline";
import { Menu, Popover, Transition } from "@headlessui/react";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { NotificationItem, add as addNotify, remove as RemoveItem } from "./redux/notificationsReducer";
import { InboxIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export const useNotifications = () => useAppSelector((state: RootState) => state.notifications);

const NotificationsCenter = () => {
  const notificationsData = useNotifications();
  const dispach = useAppDispatch();

  const { notifications, add, remove, clear, unreadCount } = useNotificationCenter<NotificationItem>({
    data: [],
    sort: (l, r) => l.createdAt - r.createdAt,
    filter: (item) => item.read === false && item?.data?.isAlert === false,
  });

  const markAsRead = (item: NotificationCenterItem<NotificationItem>) => {
    dispach(RemoveItem(item.data as NotificationItem));
    remove(item.id);
  };

  useEffect(() => {
    notificationsData.items.forEach((itm: NotificationItem) => {
      add({
        id: itm.id,
        content: itm.message,
        data: itm,
      });
    });
  }, [notificationsData]);

  return (
    <>
      <Popover as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <Popover.Button className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              {unreadCount > 0 && (
                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  <span> {unreadCount} </span>
                </div>
              )}
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Popover.Panel
                className="absolute right-0 mt-2 max-h-60 w-56 origin-top-right divide-y divide-gray-100 overflow-y-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                static
              >
                <>
                  {unreadCount == 0 ? (
                    <div className="flex items-start rounded-lg p-3 transition duration-150 ease-in-out hover:bg-gray-50">
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">Non ci sono notifiche</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <button
                          className="flex  w-full cursor-pointer items-center justify-center bg-primary-600 p-2 text-sm font-semibold tracking-wide text-white hover:bg-primary-400"
                          onClick={() => {
                            notifications.forEach((notification) => {
                              markAsRead(notification);
                            });
                          }}
                        >
                          <TrashIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                          Svuota
                        </button>
                      </div>
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="pointer-events-auto w-full max-w-sm overflow-hidden bg-white ring-1 ring-black ring-opacity-5  transition duration-150 ease-in-out"
                        >
                          <div className="p-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <InboxIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                              </div>
                              <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-medium text-gray-900"> {notification.data?.title}</p>
                                <p className="mt-1 text-sm text-gray-500">{notification.data?.message}</p>
                              </div>
                              <div className="ml-4 flex flex-shrink-0">
                                <button
                                  type="button"
                                  className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                  onClick={() => markAsRead(notification)}
                                >
                                  <span className="sr-only">Close</span>
                                  <XIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};
export default NotificationsCenter;
