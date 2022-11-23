import { DocumentTextIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import React from "react";

const ActionDetails = ({ onAction }: { onAction: () => void }) => {
  return (
    <button type="button" className="text-sm font-medium text-gray-500" onClick={() => onAction()}>
      <DocumentTextIcon className="h-9 w-9 transform p-2 text-gray-400/80 transition-all hover:scale-110 hover:text-blue-400" />
    </button>
  );
};

export default ActionDetails;
