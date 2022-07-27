import { CheckCircleIcon, PencilIcon, TrashIcon, XCircleIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { ICustomer } from "../../types/Customer";
import Button from "../Button";
import Dialog from "../shared/Dialog/Dialog";
import { Table } from "../shared/Table/Table";
import { HeadCell } from "../shared/Table/utils/interfaces/interface";
import TableList, { TableListProps } from "../TableList";

const itemsHeadTable: HeadCell[] = [
  {
    title: "ID",
    align: "left",
    onClick: () => {
      console.log("click");
    },
  },
  {
    title: "Nome",
    align: "left",
  },
  {
    title: "Email",
    align: "left",
  },
  {
    title: "Privacy",
    align: "center",
  },
  {
    title: "",
    align: "right",
  },
];

const TableCustomers = ({ items, onDeleteAction, onEditAction }: TableListProps) => {
  return (
    <TableList items={items} itemsHead={itemsHeadTable} onDeleteAction={onDeleteAction}>
      {(listItems, openModalTrashItem) => {
        return listItems?.map((item: ICustomer, index: number) => (
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
                <button type="button" className="text-sm font-medium text-gray-500" onClick={() => onEditAction && onEditAction(item)}>
                  <PencilIcon className="h-9 w-9 transform p-2 text-gray-400/80 transition-all hover:scale-110 hover:text-yellow-400" />
                </button>

                <span className="my-auto h-6 w-[1px] bg-gray-400/80" />

                <button type="button" className="text-sm font-medium text-red-400" onClick={() => openModalTrashItem(item)}>
                  <TrashIcon className="h-9 w-9 transform p-2 text-gray-400/80 transition-all hover:scale-110 hover:text-red-400" />
                </button>
              </div>
            </Table.Cell>
          </Table.Row>
        ));
      }}
    </TableList>
  );
};

export default TableCustomers;
