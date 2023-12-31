import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";

export interface ActionListItem {
  id: string;
  title: string;
  category: string;
  description: string;
}

interface ActionListProps extends InputHTMLAttributes<HTMLDivElement> {
  items: ActionListItem[];
  onEditAction?: (item: ActionListItem) => void;
  onDeleteAction?: (item: ActionListItem) => void;
}

const ActionList = ({ items, onEditAction, onDeleteAction, ...otherProps }: ActionListProps) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {items?.map((item: any) => (
        <li
          key={item.id}
          className="group relative bg-white py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-600 hover:bg-gray-50"
        >
          <div className="flex justify-between space-x-3">
            <div className="min-w-0 flex-1">
              <div className="block focus:outline-none">
                <p className="truncate text-sm font-medium text-gray-900">{item.nome}</p>
                <div className="text-sm opacity-0 transition-all duration-300 ease-in-out    group-hover:opacity-100">
                  <button className="text-gray-400" type="button" onClick={() => onEditAction && onEditAction(item)}>
                    modifica
                  </button>
                  {" - "}
                  <button className="text-red-400" type="button" onClick={() => onDeleteAction && onDeleteAction(item)}>
                    cancella
                  </button>
                </div>
              </div>
            </div>
            <span className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{item.category}</span>
          </div>
          <div className="mt-1">
            <p className="line-clamp-2 text-sm text-gray-600">{item.descrizione}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActionList;
