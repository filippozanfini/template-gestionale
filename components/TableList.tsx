import { CheckCircleIcon, PencilIcon, TrashIcon, XCircleIcon } from "@heroicons/react/solid";
import React, { FC, ReactElement, ReactNode, useEffect } from "react";
import Button from "./core/Button";
import Dialog from "./shared/Dialog/Dialog";
import Pagination from "./shared/Pagination/Pagination";
import { useCloneComponentAddingNewProps } from "./shared/Table/hook/useCloneComponentAddingNewProps";
import { Table } from "./shared/Table/Table";
import { HeadCell } from "./shared/Table/utils/interfaces/interface";

export interface TableListProps {
  itemsHead?: HeadCell[];
  items?: any;
  children?: (listItems: any, openModalTrashItem: (item: any) => void) => JSX.Element | React.ReactNode;
  onEditAction?: (item: any) => void;
  onDeleteAction?: (item: any) => void;
  onSelectedQuote?: (item: any) => void;
}

/**
 * Component for body of table (cell) rendering
 *
 * @param children function - children of table body with
 * @returns (listItems: any, openModalTrashItem: (item: any) => void) => JSX.Element | React.ReactNode
 */
const TableList: FC<TableListProps> = ({ items, itemsHead, children, onDeleteAction }) => {
  const [listItems, setListItems] = React.useState(items);
  const [showDialog, setShowDialog] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState<any | null>();

  const openModalTrashItem = (item: any) => {
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

  useEffect(() => {
    setListItems(items);

    return () => {
      setListItems([]);
    };
  }, [items]);

  return (
    <div className="space-y-8 ">
      <Table>
        <Table.Header>
          <Table.Row>
            {itemsHead?.map((item, index) => (
              <Table.Cell key={index} align={item.align} onClick={item.onClick}>
                {item.title}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body className="divide-y bg-white ">{children && children(listItems, openModalTrashItem)}</Table.Body>
      </Table>

      <Dialog title={`Conferma eliminazione?`} isOpen={showDialog} onClose={() => closeModalTrashItem()}>
        <p className="mt-2 text-sm">{"L'azione sarà irreversibile."}</p>
        <div className="mt-6 flex gap-3">
          <Button title="Annulla" aria="" className="w-full bg-gray-500 px-5 py-2" onClick={() => closeModalTrashItem()} />
          <Button
            title="Conferma"
            aria=""
            className="w-full bg-red-500 px-5 py-2 outline-hidden outline-red-500 hover:bg-red-600"
            onClick={() => confirmDeleteItem()}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default TableList;
