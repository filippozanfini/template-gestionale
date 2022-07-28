import React from "react";
import ActionDelete from "../core/ActionDelete";
import ActionEdit from "../core/ActionEdit";

interface ActionEditDeleteProps {
  onEditAction: (item?: any) => void;
  onDeleteAction: (item?: any) => void;
}

const ActionEditDelete = ({ onDeleteAction, onEditAction }: ActionEditDeleteProps) => {
  return (
    <div className="flex gap-2">
      <ActionEdit onAction={() => onEditAction()} />

      <span className="my-auto h-6 w-[1px] bg-gray-400/80" />

      <ActionDelete onAction={() => onDeleteAction()} />
    </div>
  );
};

export default ActionEditDelete;
