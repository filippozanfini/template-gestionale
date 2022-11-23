import { ToastContainer, toast } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { XIcon } from "@heroicons/react/solid";
import { NotificationItem } from "./redux/notificationsReducer";
import { NotificationIconMapper } from "../../utils/NotificationIconMapper";

const contextClass: any = {
  success: {
    sfondo: "bg-green-50",
    h1: "text-green-900",
    p: "text-green-700",
    icon: "text-green-400",
    close:
      "bg-green-50 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600",
  },
  error: {
    sfondo: "bg-red-50",
    h1: "text-red-900",
    p: "text-red-700",
    icon: "text-red-400",
    close:
      "bg-red-50 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600",
  },
  info: {
    sfondo: "bg-blue-50",
    h1: "text-blue-900",
    p: "text-blue-700",
    icon: "text-blue-400",
    close:
      "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-blue-600",
  },
  warning: {
    sfondo: "bg-yellow-50",
    h1: "text-yellow-900",
    p: "text-yellow-700",
    icon: "text-yellow-400",
    close:
      "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600",
  },
  default: {
    sfondo: "bg-white-50",
    h1: "text-gray-900",
    p: "text-gray-700",
    icon: "text-gray-400",
    close:
      "bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600",
  },
};

const Alert = ({ closeToast, toastProps }: any): React.ReactNode => {
  const colors = contextClass[toastProps.type] ?? contextClass["default"];
  const Icon = NotificationIconMapper[toastProps.type];

  return (
    <div className="flex">
      <div className="flex-shrink-0">
        <Icon className={"h-5 w-5 " + colors.icon} aria-hidden="true" />
      </div>
      <div className="ml-3">
        <p className={"text-sm font-medium " + colors.h1}>{toastProps.data.title}</p>
        <p className={"mt-1 text-sm " + colors.p}>{toastProps.data.message}</p>
      </div>
      <div className="ml-auto pl-3">
        <div className="-mx-1.5 -my-1.5">
          <button
            type="button"
            className={"inline-flex  rounded-md p-1.5 " + colors.close}
            onClick={() => {
              closeToast();
            }}
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationsContainer = () => {
  return (
    <>
      <ToastContainer
        toastClassName={(props: any) => contextClass[props.type || "default"].sfondo + " rounded-md p-4 my-2"}
        bodyClassName={() => ""}
        position="top-right"
      />
    </>
  );
};

export const alert = (payload: NotificationItem) => {
  if (payload.isAlert) {
    const message = {
      position: toast.POSITION.TOP_RIGHT,
      data: payload,
      hideProgressBar: true,
      closeButton: false,
      icon: false,
    };

    switch (payload.type) {
      case "info":
        return toast.info(Alert, message);
      case "warning":
        return toast.warning(Alert, message);
      case "error":
        return toast.error(Alert, message);
      case "success":
        return toast.success(Alert, message);
    }
  }
};

export default NotificationsContainer;
