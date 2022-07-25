import { ToastContainer, toast, ToastContent } from 'react-toastify'
import React, { Fragment, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { useNotificationCenter } from 'react-toastify/addons/use-notification-center'
import { BellIcon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'
import { CheckCircleIcon, ColorSwatchIcon, XIcon } from '@heroicons/react/solid'
import { startAppListening } from '../redux/store'
import {push as PushAction, remove as removeNotification } from '../redux/notificationsReducer'


const Notifications = () => {
  const { notifications, add, remove, unreadCount } = useNotificationCenter({
    data: [],
    sort: (l, r) => l.createdAt - r.createdAt,
    filter: (item) => item.data?.isAlert === false,
  })



  const contextClass = {
    success: {
        sfondo: "bg-green-50",
        h1: "text-green-900",
        p: "text-green-700",
        icon: "text-green-400",
        close: "bg-green-50 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
    },
    error: {
        sfondo: "bg-red-50",
        h1: "text-red-900",
        p: "text-red-700",
        icon: "text-red-400",
        close: "bg-red-50 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
    },
    info: {
        sfondo: "bg-blue-50",
        h1: "text-blue-900",
        p: "text-blue-700",
        icon: "text-blue-400",
        close: "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600"
    },
    warning: {
        sfondo: "bg-yellow-50",
        h1: "text-yellow-900",
        p: "text-yellow-700",
        icon: "text-yellow-400",
        close: "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
    },
    default: {
        sfondo: "bg-white-50",
        h1: "text-gray-900",
        p: "text-gray-700",
        icon: "text-gray-400",
        close: "bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600"
    }
  };

  const Alert = ({ closeToast, toastProps }) => {

    const colors = contextClass[toastProps.type] ?? contextClass["default"];

    return <div className="flex">
      <div className="flex-shrink-0">
        <CheckCircleIcon className={"h-5 w-5 " + colors.icon } aria-hidden="true" />
      </div>
      <div className="ml-3">
        <p className={"text-sm font-medium " + colors.h1 } >{toastProps.data.title}</p>
          <p className={"mt-1 text-sm " + colors.p }>{toastProps.data.message}</p>
      </div>
      <div className="ml-auto pl-3">
        <div className="-mx-1.5 -my-1.5">
          <button
            type="button"
            className={"inline-flex  rounded-md p-1.5 " + colors.close }
            onClick={() => {
                closeToast()
              }}
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  }



const onNewNotification = async ({ payload }) => {

    if (payload.isAlert) {

        const message = {
            position: toast.POSITION.TOP_RIGHT,
            data: payload,
            hideProgressBar: true,
            closeButton:false,
            icon: false
        } ;

        switch( payload.type ){
            case "info":
                return toast.info(Alert, message);
            case "warning" :
                return toast.warning(Alert ,message);
            case "error" :
                return toast.error(Alert,message);
            case  "success":
                return toast.success(Alert,message);
        }

      } else {
        add({
          id: payload.id,
          content: payload.message,
          data: payload,
        })
      }


  }



  useEffect(() => {



    const unsubscribe =
        startAppListening({
          actionCreator: PushAction,
          effect: onNewNotification,
        });



    const unsubscribeToast = toast.onChange((payload) => {
        switch (payload.status) {
          case "added":
            // new toast added
            break;
          case "updated":
            // toast updated
            break;
          case "removed":
            removeNotification( payload.data )
            break;
        }
      });


    return () => { unsubscribe(); unsubscribeToast(); }
  }, [])

  return (
    <>
      <ToastContainer  toastClassName={ ({ type }) => contextClass[type || "default"].sfondo +
        " rounded-md p-4 my-2"
      }
      bodyClassName={() => ""}
      position="top-right" />
      <Menu as="div" className="relative inline-block text-left">
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
                className="p-3 flex items-start rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                onClick={ () => remove(notification.id) }
              >
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">
                    {notification.data?.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {notification.data?.message}
                  </p>
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
export default Notifications
