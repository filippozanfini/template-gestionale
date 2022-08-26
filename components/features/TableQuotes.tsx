import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { Quote, eQuoteStatus } from "../../models/Quote";
import { OrderStatusMapper } from "../../utils/OrderStatusMapper";
import ActionEditDelete from "../shared/ActionEditDelete";
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
    title: "Costo (iva inclusa)",
    align: "center",
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

            <Table.Cell align="center">
              <p className="text-xs text-gray-900 ">{item.costo} €</p>
            </Table.Cell>

            <Table.Cell align="center">
              <p className="text-xs">{OrderStatusMapper[item.statoPreventivo ?? "none"]}</p>
            </Table.Cell>

            <Table.Cell align="center">
              <p className="text-xs text-gray-900 ">{item.dataScadenza.toString()}</p>
            </Table.Cell>

            <Table.Cell align="right">
              <ActionEditDelete onDeleteAction={() => openModalTrashItem(item)} onEditAction={() => onEditAction && onEditAction(item)} />
            </Table.Cell>
          </Table.Row>
        ));
      }}
    </TableList>
  );
};

export default TableQuotes;
