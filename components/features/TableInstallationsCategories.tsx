import { XCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { Category } from "../../models/Category";
import { ICategory } from "../../models/interfaces/Category";
import ActionEdit from "../core/ActionEdit";
import IconBadge from "../core/IconBadge";
import ListBox from "../shared/ListBox/ListBox";
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
];

const TableInstallationsCategories = ({ items }: TableListProps) => {
  return (
    <TableList items={items} itemsHead={itemsHeadTable}>
      {(listItems, openModalTrashItem) => {
        return listItems?.map((item: Category, index: number) => (
          <Table.Row key={item.id} className={["transition-all duration-500"].join(" ")}>
            <Table.Cell title="ID">
              <p className="text-sm font-semibold text-gray-900">{item.id}</p>
            </Table.Cell>
            <Table.Cell title="Nome">
              <p className="text-sm font-semibold text-gray-900">{item.nome}</p>
            </Table.Cell>
          </Table.Row>
        ));
      }}
    </TableList>
  );
};

export default TableInstallationsCategories;
