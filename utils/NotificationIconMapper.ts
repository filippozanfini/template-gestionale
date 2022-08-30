import { ReactElement, ReactNode } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { InformationCircleIcon, ExclamationCircleIcon } from "@heroicons/react/outline";

type NotificationIconMapperType = {
  [key: string]: any;
};

export const NotificationIconMapper: NotificationIconMapperType = {
  info: InformationCircleIcon,
  warning: ExclamationCircleIcon,
  error: XCircleIcon,
  success: CheckCircleIcon,
};
