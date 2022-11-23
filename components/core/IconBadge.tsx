import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import React from "react";

const IconBadge = ({ checked }: { checked: boolean }) => {
  return checked ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <XCircleIcon className="h-5 w-5 text-red-400" />;
};

export default IconBadge;
