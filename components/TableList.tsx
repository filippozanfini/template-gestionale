import { CheckCircleIcon, PencilIcon, TrashIcon, XCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { ICustomer } from "../types/Customer";
import { Table } from "./shared/Table/Table";
import { HeadCell } from "./shared/Table/utils/interfaces/interface";

interface TableListProps {
  itemsHead: HeadCell[];
  items: ICustomer[];
  onEditAction?: (item: any) => void;
  onDeleteAction?: (item: any) => void;
}

const TableList = ({ items, itemsHead: itemsHeader, onDeleteAction, onEditAction }: TableListProps) => {
  const [listItems, setListItems] = React.useState(items);

  const orderList = () => {
    const list = [...listItems.sort((a, b) => a.id - b.id)];
    setListItems(list);
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Clienti</h1>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Aggiungi
        </button>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            {itemsHeader.map((item, index) => (
              // <Table.Cell key={index} align={item.align} onClick={() => item.onClick && item.onClick()}>
              <Table.Cell key={index} align={item.align} onClick={() => orderList()}>
                {item.title}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body className="divide-y bg-white">
          {listItems.map((item: ICustomer, index: number) => (
            <Table.Row key={item.id} className="hover:bg-slate-50">
              <Table.Cell title="ID">
                <p className="text-sm font-semibold text-gray-900">{item.id}</p>
              </Table.Cell>

              <Table.Cell>
                <div className="flex flex-col text-sm">
                  <p className="font-medium text-gray-900">{item.nome + " " + item.cognome}</p>
                  <p className="font-normal text-gray-500/90">{item.indirizzo}</p>
                </div>
              </Table.Cell>

              <Table.Cell>
                <a href={`mailto:${item.email}`} className="text-xs text-gray-900 hover:text-blue-600 hover:underline">
                  {item.email}
                </a>
              </Table.Cell>

              <Table.Cell align="center">
                {item.privacyAccettata ? (
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-400" />
                )}
              </Table.Cell>

              <Table.Cell align="right">
                <div className="flex h-full gap-2">
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-500"
                    onClick={() => onEditAction && onEditAction(item)}
                  >
                    <PencilIcon className="h-9 w-9 transform p-2 text-gray-400/80 transition-all hover:scale-110 hover:text-yellow-400" />
                  </button>

                  <span className="my-auto h-6 w-[1px] bg-gray-400/80" />

                  <button
                    type="button"
                    className="text-sm font-medium text-red-400"
                    onClick={() => onDeleteAction && onDeleteAction(item)}
                  >
                    <TrashIcon className="h-9 w-9 transform p-2 text-gray-400/80 transition-all hover:scale-110 hover:text-red-400" />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableList;
