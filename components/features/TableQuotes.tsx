import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { Quote, eQuoteStatus } from "../../models/Quote";
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
    title: "Utente",
    align: "left",
  },
  {
    title: "Costo",
    align: "left",
  },
  {
    title: "Stato Preventivo",
    align: "center",
  },
  {
    title: "Data Scadenza",
    align: "center",
  },
  {
    title: "",
    align: "right",
  },
];

const TableQuotes = ({ items, onDeleteAction, onEditAction }: TableListProps) => {
  return (
    <TableList items={items} itemsHead={itemsHeadTable} onDeleteAction={onDeleteAction}>
      {(listItems, openModalTrashItem) => {
        return listItems?.map((item: Quote, index: number) => (
          <Table.Row key={item.id} className="hover:bg-slate-50">
            <Table.Cell title="ID">
              <p className="text-sm font-semibold text-gray-900">{item.id}</p>
            </Table.Cell>

            <Table.Cell>
              <div className="flex flex-col text-sm">
                <p className="font-medium text-gray-900">{item.utente?.nome + " " + item.utente?.cognome}</p>
                <p className="font-normal text-gray-500/90">{item.utente?.email}</p>
              </div>
            </Table.Cell>

            <Table.Cell>
              <p className="text-xs text-gray-900 ">{item.costo}</p>
            </Table.Cell>

            <Table.Cell align="center">{Object.keys(eQuoteStatus).indexOf(item.statoPreventivo)}</Table.Cell>
            <Table.Cell align="center">
              <p className="text-xs text-gray-900 ">{item.dataScadenza.toString()}</p>
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

export default TableQuotes;
