import { PencilIcon } from "@heroicons/react/solid";
import React from "react";

const ActionEdit = ({ onAction }: { onAction: () => void }) => {
  return (
    <button type="button" className="text-sm font-medium text-gray-500" onClick={() => onAction()}>
      <PencilIcon className="h-9 w-9 transform p-2 text-gray-400/80 transition-all hover:scale-110 hover:text-yellow-400" />
    </button>
  );
};

export default ActionEdit;
