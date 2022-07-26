import { CheckCircleIcon, PencilIcon, TrashIcon, XCircleIcon } from "@heroicons/react/solid";
import React, { useEffect } from "react";
import { ICustomer } from "../types/Customer";
import Button from "./Button";
import Dialog from "./shared/Dialog/Dialog";
import Pagination from "./shared/Pagination/Pagination";
import { Table } from "./shared/Table/Table";
import { HeadCell } from "./shared/Table/utils/interfaces/interface";

interface TableListProps {
  itemsHead: HeadCell[];
  items: ICustomer[];
  onEditAction?: (item: any) => void;
  onDeleteAction?: (item: any) => void;
}

const TableList = ({ items, itemsHead: itemsHeader, onDeleteAction, onEditAction }: TableListProps) => {
  const [listItems, setListItems] = React.useState(items);
  const [showDialog, setShowDialog] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState<ICustomer | null>();

  const openModalTrashItem = (item: ICustomer) => {
    setCurrentItem(item);
    setShowDialog(true);
  };

  const closeModalTrashItem = () => {
    setShowDialog(false);
    setTimeout(() => setCurrentItem(null), 200);
  };

  const confirmDeleteItem = () => {
    if (onDeleteAction) {
      onDeleteAction(currentItem);
    }
    closeModalTrashItem();
  };

  // const orderList = () => {
  //   const list = [...listItems.sort((a, b) => a.id - b.id)];
  //   setListItems(list);
  // };

  useEffect(() => {
    setListItems(items);
  }, [items]);

  return (
    <div className="space-y-8 ">
      <Table>
        <Table.Header>
          <Table.Row>
            {itemsHeader.map((item, index) => (
              // <Table.Cell key={index} align={item.align} onClick={() => item.onClick && item.onClick()}>
              <Table.Cell
                key={index}
                align={item.align}
                onClick={() => {
                  /* orderList() */
                }}
              >
                {item.title}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body className="divide-y bg-white">
          {listItems.map((item: ICustomer, index: number) => (
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
                  <button
                    type="button"
                    className="text-sm font-medium text-gray-500"
                    onClick={() => onEditAction && onEditAction(item)}
                  >
                    <PencilIcon className="h-9 w-9 transform p-2 text-gray-400/80 transition-all hover:scale-110 hover:text-yellow-400" />
                  </button>

                  <span className="my-auto h-6 w-[1px] bg-gray-400/80" />

                  <button
                    type="button"
                    className="text-sm font-medium text-red-400"
                    onClick={() => openModalTrashItem(item)}
                  >
                    <TrashIcon className="h-9 w-9 transform p-2 text-gray-400/80 transition-all hover:scale-110 hover:text-red-400" />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Dialog
        title={`Conferma eliminazione di ${currentItem?.nome} ${currentItem?.cognome}?`}
        isOpen={showDialog}
        onClose={() => closeModalTrashItem()}
      >
        <p className="mt-2 text-sm">L'azione non sarà reversibile.</p>
        <div className="mt-6 flex gap-3">
          <Button
            title="Conferma"
            aria=""
            className="w-full bg-red-500 px-5 py-2 outline-none hover:bg-red-600"
            onClick={() => confirmDeleteItem()}
          />
          <Button
            title="Annulla"
            aria=""
            className="w-full bg-primary-500 px-5 py-2"
            onClick={() => closeModalTrashItem()}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default TableList;
