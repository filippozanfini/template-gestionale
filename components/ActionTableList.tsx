/* eslint-disable react/jsx-key */
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, XCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React, { ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { ICustomer } from "../types/Customer";

export interface ActionTableListProps {
  items: ICustomer[];
  onEditAction?: (item: ICustomer) => void;
  onDeleteAction?: (item: ICustomer) => void;
}

const ActionTableList = ({ items, onDeleteAction, onEditAction }: ActionTableListProps) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Servizi</h1>
          <p className="mt-2 text-sm text-gray-700">Lista di servizi consumabili.</p>
        </div>

        <div className="mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Nuovo
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="w-full border-collapse table-auto divide-y divide-gray-300">
            <thead className="bg-gray-50 text-sm ">
              <tr>
                <th scope="col" className="p-3.5 pl-8 text-left font-semibold text-gray-900 ">
                  #
                </th>
                <th scope="col" className="p-3.5 text-left text-sm font-semibold text-gray-900">
                  Nome
                </th>
                <th scope="col" className=" p-3.5 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th scope="col" className="p-3.5 text-left text-sm font-semibold text-gray-900">
                  Privacy
                </th>
                <th scope="col" className="p-3.5 pr-8 text-center text-sm font-semibold text-gray-900"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {items.map((item: ICustomer) => (
                <tr key={item.id}>
                  <td className="p-3.5 pl-8 text-left text-sm font-semibold text-gray-900">{item.id}</td>

                  <td className="p-3.5 text-sm text-gray-500">
                    <p className="text-gray-900 font-medium">{item.nome + " " + item.cognome}</p>
                    <p className="text-gray-500">{item.indirizzo}</p>
                  </td>

                  <td className="p-3.5 gap-2 text-sm text-gray-500">
                    <a
                      href={`mailto:${item.email}`}
                      className=" hover:underline hover:text-blue-600 text-xs font-semibold leading-5 text-gray-900"
                    >
                      {item.email}
                    </a>
                  </td>

                  <td className="p-3.5 pl-7 text-sm text-gray-500">
                    {item.privacyAccettata ? (
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircleIcon className="w-6 h-6 text-red-400" />
                    )}
                  </td>

                  <td className="p-3.5 pr-8 text-sm font-medium w-28">
                    <div className="flex gap-4 h-full">
                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500"
                        onClick={() => onEditAction && onEditAction(item)}
                      >
                        <PencilIcon className="w-9 h-9 hover:scale-110 transition-all transform hover:text-yellow-400 text-gray-400/80 p-2" />
                      </button>

                      <span className="bg-gray-400/80 w-[1px] h-6 my-auto" />

                      <button
                        type="button"
                        className="text-red-400 text-sm font-medium"
                        onClick={() => onDeleteAction && onDeleteAction(item)}
                      >
                        <TrashIcon className="w-9 h-9 p-2 hover:scale-110 transition-all transform hover:text-red-400 text-gray-400/80" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActionTableList;
