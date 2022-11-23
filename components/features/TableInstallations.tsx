import { CheckCircleIcon } from "@heroicons/react/solid";
import { title } from "process";
import { IInstallation } from "../../models/Installation";
import { CategoryMapper } from "../../utils/CategoryMapper";
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
    title: "Data installazione",
    align: "left",
  },
  {
    title: "Categoria",
    align: "left",
  },
  {
    title: "Marca",
    align: "left",
  },
  {
    title: "",
    align: "right",
  },
];

const TableInstallations = ({ items, selectedItem, onSelectedItem, onDeleteAction, onEditAction }: TableListProps) => {
  return (
    <TableList items={items} itemsHead={itemsHeadTable} onDeleteAction={onDeleteAction}>
      {(listItems, openModalTrashItem) => {
        return listItems?.map((item: IInstallation, index: number) => (
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
                {/* <p className="font-normal text-gray-500/90">{item.utente?.email}</p> */}
                <p className="font-normal text-gray-500/90">{item.utente?.indirizzo}</p>
              </div>
            </Table.Cell>

            <Table.Cell>
              <p className="text-xs text-gray-900 ">{item.dataInstallazione}</p>
            </Table.Cell>

            <Table.Cell>
              <p className="text-xs text-gray-900 ">{item.categoriaImpianto && CategoryMapper[item.categoriaImpianto]}</p>
            </Table.Cell>

            <Table.Cell align="left">
              <p className="text-xs text-gray-900 ">{item.marca}</p>
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

export default TableInstallations;