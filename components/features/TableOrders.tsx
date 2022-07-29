import { useState } from "react";
import { Customer, ICustomer } from "../../models/Customer";
import { IInstallation } from "../../models/Installation";
import { eOrderStatus, IOrder, Order } from "../../models/Order";
import ActionEdit from "../core/ActionEdit";
import ActionEditDelete from "../shared/ActionEditDelete";
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
    title: "Import",
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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [orserStatus, setOrderStatus] = useState<eOrderStatus>(eOrderStatus.none);

  const handleActionEdit = (item: IOrder) => {
    isEditing ? setOrder(item) : setOrder({});
    setIsEditing(!isEditing);
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
                <ListBox listItems={listOrderStatus} onChange={() => {}} selected={"sfa"} selectedName={"sadfas"} />
              ) : (
                <p className="text-xs text-gray-900 ">{item.stato}</p>
              )}
            </Table.Cell>

            <Table.Cell align="right">
              <ActionEdit onAction={() => handleActionEdit(item)} />
            </Table.Cell>
          </Table.Row>
        ));
      }}
    </TableList>
  );
};

export default TableOrders;
