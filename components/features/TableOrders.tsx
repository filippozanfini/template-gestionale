import { XCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { eOrderStatus, IOrder, Order } from "../../models/Order";
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
    title: "Utente",
    align: "left",
  },
  {
    title: "Data acquisto",
    align: "left",
  },
  {
    title: "Importo",
    align: "left",
  },
  {
    title: "Stato",
    align: "left",
  },
  {
    title: "",
    align: "right",
  },
];

const listOrderStatus = Object.values(eOrderStatus);

const TableOrders = ({ items, onDeleteAction, onEditAction }: TableListProps) => {
  const [order, setOrder] = useState<IOrder>({});
  const [orserStatus, setOrderStatus] = useState<eOrderStatus>(eOrderStatus.none);

  const handleActionEdit = (item: IOrder) => {
    Object.keys(order).length > 0 ? setOrder({}) : setOrder(item);
  };

  return (
    <TableList items={items} itemsHead={itemsHeadTable} onDeleteAction={onDeleteAction}>
      {(listItems, openModalTrashItem) => {
        return listItems?.map((item: IOrder, index: number) => (
          <Table.Row key={item.id} className={["transition-all duration-500 ", item.id == order.id ? "bg-yellow-100" : ""].join(" ")}>
            <Table.Cell title="ID">
              <p className="text-sm font-semibold text-gray-900">{item.id}</p>
            </Table.Cell>

            <Table.Cell>
              <div className="flex flex-col text-sm">
                <p className="font-medium text-gray-900">{item.utente?.nome + " " + item.utente?.cognome}</p>
                <p className="font-normal text-gray-500/90">{item.utente?.indirizzo}</p>
              </div>
            </Table.Cell>

            <Table.Cell>
              <p className="text-xs text-gray-900 ">{item.dataAcquisto ? Order.dateToString(item.dataAcquisto) : ""}</p>
            </Table.Cell>

            <Table.Cell>
              <p className="text-xs text-gray-900 ">{item.importo}</p>
            </Table.Cell>

            <Table.Cell align="left">
              {item.id == order.id ? (
                <ListBox listItems={listOrderStatus} onChange={() => {}} selected={item.stato} selectedName={item.stato ?? ""} />
              ) : (
                <p className="text-xs text-gray-900 ">{item.stato}</p>
              )}
            </Table.Cell>

            <Table.Cell align="right">
              {Object.keys(order).length > 0 && item.id == order.id ? (
                <XCircleIcon className="h-8 w-8 cursor-pointer p-1 pr-2 text-red-500" onClick={() => handleActionEdit(item)} />
              ) : (
                <ActionEdit onAction={() => handleActionEdit(item)} />
              )}
            </Table.Cell>
          </Table.Row>
        ));
      }}
    </TableList>
  );
};

export default TableOrders;
