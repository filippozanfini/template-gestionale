import { TrashIcon } from "@heroicons/react/solid";
import React from "react";

const ActionDelete = ({ onAction }: { onAction: () => void }) => {
  return (
    <button type="button" className="text-sm font-medium text-red-400" onClick={() => onAction()}>
      <TrashIcon className="h-9 w-9 transform p-2 text-gray-400/80 transition-all hover:scale-110 hover:text-red-400" />
    </button>
  );
};

export default ActionDelete;
