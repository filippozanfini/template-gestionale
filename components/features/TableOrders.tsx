import { CheckCircleIcon, DocumentTextIcon, XCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mpApi } from "../../lib/mpApi";
import { eOrderStatus, IOrder, Order } from "../../models/Order";
import { InverterOrderStatusMapper, OrderStatusMapper } from "../../utils/OrderStatusMapper";
import ActionDetails from "../core/ActionDetails";
import ActionEdit from "../core/ActionEdit";
import IconBadge from "../core/IconBadge";
import { alert } from "../notifications/NotificationContainer";
import ListBox from "../shared/ListBox/ListBox";
import Overlay from "../shared/Overlay";
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

const listOrderStatus = Object.values(eOrderStatus).filter((value) => {
  return value !== "NONE" && value !== "NON ACCETTATO" && value !== "SCADUTO" && value !== "ACCETTATO";
});

const TableOrders = ({ items, onDeleteAction, onEditAction }: TableListProps) => {
  const [order, setOrder] = useState<IOrder>({});
  const [orders, setOrders] = useState<IOrder[]>(items);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  const handleActionEdit = (item: IOrder) => {
    Object.keys(order).length > 0 ? setOrder({}) : setOrder({ ...item });
  };

  const handleOrderStatus = (order: IOrder, newOrderStatus: string) => {
    const newOrder: IOrder = { ...order, stato: newOrderStatus };
    setIsLoading(true);
    mpApi.orders.actions
      .save(order, newOrderStatus)
      .then((res) => {
        if (res) {
          setOrders((prev) => {
            const index = prev.findIndex((item) => item.id === order.id);
            prev[index] = newOrder;
            return [...prev];
          });
          setOrder({});
          alert({
            id: "order-status-changed",
            type: "success",
            title: "Ordine aggiornato",
            message: `Lo stato dell'ordine ${order.id} è stato aggiornato a ${newOrderStatus.toUpperCase()}`,
            isAlert: true,
            read: false,
          });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setOrders(items);
  }, [items]);

  return (
    <>
      <TableList items={orders} itemsHead={itemsHeadTable} onDeleteAction={onDeleteAction}>
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
                <p className="text-xs text-gray-900 ">{item.dataDiAcquisto ? Order.dateToString(item.dataDiAcquisto) : ""}</p>
              </Table.Cell>

              <Table.Cell>
                <p className="text-xs text-gray-900 ">{item.importo} €</p>
              </Table.Cell>

              <Table.Cell align="left" position={item.id == order.id ? "absolute" : "relative"}>
                {item.id == order.id ? (
                  <div className="listbox sticky inset-x-0 z-50 w-36">
                    <ListBox
                      listItems={listOrderStatus}
                      onChange={(value: any) => handleOrderStatus(item, InverterOrderStatusMapper[value])}
                      selected={OrderStatusMapper[item.stato ?? "none"]}
                      selectedName={OrderStatusMapper[item.stato ?? "none"] ?? ""}
                    />
                  </div>
                ) : (
                  <p className="text-xs text-gray-900 ">{OrderStatusMapper[item.stato ?? "none"]}</p>
                )}
              </Table.Cell>

              <Table.Cell align="right">
                {Object.keys(order).length > 0 && item.id == order.id ? (
                  <div className="flex gap-2">
                    <XCircleIcon className="h-8 w-8 cursor-pointer p-1 pr-2 text-red-500" onClick={() => handleActionEdit(item)} />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ActionDetails onAction={() => push(`/ordini/detail/?id=${item.id}`)} />
                    <ActionEdit onAction={() => handleActionEdit(item)} />
                  </div>
                )}
              </Table.Cell>
            </Table.Row>
          ));
        }}
      </TableList>
      <Overlay loading={isLoading} />
    </>
  );
};

export default TableOrders;
