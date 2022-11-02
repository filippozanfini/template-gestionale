import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { ICustomer } from "../../models/Customer";
import { IService } from "../../models/Service";
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
    title: "Nome",
    align: "left",
  },
  {
    title: "Descrizione",
    align: "left",
  },
  {
    title: "Costo (iva inclusa €)",
    align: "left",
  },
  {
    title: "Novità",
    align: "center",
  },
  {
    title: "",
    align: "right",
  },
];

const TableServices = ({ items, selectedItem, onSelectedItem, onDeleteAction, onEditAction }: TableListProps) => {
  return (
    <TableList items={items} itemsHead={itemsHeadTable} onDeleteAction={onDeleteAction}>
      {(listItems, openModalTrashItem) => {
        return listItems?.map((item: IService, index: number) => (
          <Table.Row
            key={item.id}
            className={["", selectedItem?.id === item.id ? "bg-green-200 hover:bg-green-200" : "hover:bg-slate-50"].join(" ")}
          >
            <Table.Cell title="ID">
              <p className="text-sm font-semibold text-gray-900">{item.id}</p>
            </Table.Cell>

            <Table.Cell>
              <div className="flex flex-col text-sm">
                <p className="font-normal ">{item.nome}</p>
              </div>
            </Table.Cell>

            <Table.Cell>
              <p className="text-xs text-gray-900 ">{item.descrizione}</p>
            </Table.Cell>

            <Table.Cell>
              <p className="text-xs text-gray-900 ">{item.costo}</p>
            </Table.Cell>

            <Table.Cell align="center">
              {item.novita ? <CheckCircleIcon className="h-5 w-5 text-green-500" /> : <XCircleIcon className="h-5 w-5 text-red-400" />}
            </Table.Cell>

            <Table.Cell align="right">
              {onSelectedItem ? (
                <button className="h-6 w-6 rounded-full border border-gray-200 " type="button" onClick={() => onSelectedItem(item)}>
                  {selectedItem?.id === item.id ? <CheckCircleIcon className="h-full w-full text-green-600" /> : null}
                </button>
              ) : (
                <ActionEditDelete onDeleteAction={() => openModalTrashItem(item)} onEditAction={() => onEditAction && onEditAction(item)} />
              )}
            </Table.Cell>
          </Table.Row>
        ));
      }}
    </TableList>
  );
};

export default TableServices;
