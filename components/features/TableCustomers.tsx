import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import React from "react";
import { ICustomer } from "../../models/Customer";
import IconBadge from "../core/IconBadge";
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
              <IconBadge checked={item.privacyAccettata ?? false} />
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

export default TableCustomers;
