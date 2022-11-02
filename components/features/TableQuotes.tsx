import { CheckCircleIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import React from "react";
import { Installation } from "../../models/Installation";
import { Package } from "../../models/Package";
import { Quote, eQuoteStatus, IQuote } from "../../models/Quote";
import { Service } from "../../models/Service";
import { OrderStatusMapper } from "../../utils/OrderStatusMapper";
import ActionDelete from "../core/ActionDelete";
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

const TableQuotes = ({ items, onSelectedItem, selectedItem, onDeleteAction, onEditAction }: TableListProps) => {
  return (
    <TableList items={items} itemsHead={itemsHeadTable} onDeleteAction={onDeleteAction}>
      {(listItems, openModalTrashItem) => {
        return listItems?.map((item: Quote, index: number) => {
          const isAccepted = OrderStatusMapper[item.statoPreventivo ?? "none"] === String(eQuoteStatus.accettato);

          return (
            <Table.Row
              key={item.id}
              className={["", selectedItem?.id === item.id ? "bg-green-200 hover:bg-green-200" : "hover:bg-slate-50"].join(" ")}
            >
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
                <p className="text-xs text-gray-900 ">{item.dataScadenza?.toString()}</p>
              </Table.Cell>

              <Table.Cell align="right">
                {onSelectedItem ? (
                  <button className="h-6 w-6 rounded-full border border-gray-200 " type="button" onClick={() => onSelectedItem(item)}>
                    {selectedItem?.id === item.id ? <CheckCircleIcon className="h-full w-full text-green-600" /> : null}
                  </button>
                ) : isAccepted ? (
                  <ActionDelete onAction={() => openModalTrashItem(item)} />
                ) : (
                  <ActionEditDelete
                    onDeleteAction={() => openModalTrashItem(item)}
                    onEditAction={() => onEditAction && onEditAction(item)}
                  />
                )}
              </Table.Cell>
            </Table.Row>
          );
        });
      }}
    </TableList>
  );
};

export default TableQuotes;
