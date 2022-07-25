import React, { Fragment, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { NotificationCenterItem, useNotificationCenter } from 'react-toastify/addons/use-notification-center'
import { BellIcon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { NotificationItem, add as addNotify, remove as RemoveItem } from '../../redux/notificationsReducer'
import { InboxIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'

export const useNotifications = () => useAppSelector((state: RootState) => state.notifications)

const NotificationsCenter = () => {

  const notificationsData = useNotifications();
  const dispach = useAppDispatch();

  const { notifications, add, remove, clear, unreadCount } = useNotificationCenter<NotificationItem>({
    data: [],
    sort: (l, r) => l.createdAt - r.createdAt,
    filter: (item) => item.read === false && item?.data?.isAlert === false,
  })

  const markAsRead = (item: NotificationCenterItem<NotificationItem>)  => {
      dispach( RemoveItem( item.data as NotificationItem ) );
      remove( item.id);
  }

  useEffect(() => {
    notificationsData.items.forEach( (itm: NotificationItem) => {
      add({
        id: itm.id,
        content: itm.message,
        data: itm,
      })
    });

  }, [
    notificationsData
  ])

  return (<><Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 relative">
          {unreadCount > 0 && (
            <div className="rounded-full w-4 h-4 text-xs text-white bg-red-500 absolute top-0 right-1">
              {unreadCount}
            </div>
          )}
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none overflow-y-auto max-h-60">
          { unreadCount == 0 ?  <Menu.Item  as="div" className="p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150">
            <div className="ml-4">
              <p className="text-base font-medium text-gray-900">
                Non ci sono notifiche
              </p>
            </div>
          </Menu.Item>
           :
          (
            notifications.map((notification) => (
              <Menu.Item
                key={notification.id}
                as="div"
                className="max-w-sm w-full bg-white pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden  transition ease-in-out duration-150"
              >
             <div className="">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <InboxIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">  {notification.data?.title}</p>
                    <p className="mt-1 text-sm text-gray-500">
                    {notification.data?.message}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      type="button"
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => markAsRead(notification)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

              </Menu.Item>
            ) ) )
        }
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
export default NotificationsCenter

