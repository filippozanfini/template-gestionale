import { SearchIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import FormInput from "../../components/FormInput";
import Combobox from "../../components/shared/ComboBox/Combobox";
import Pagination from "../../components/shared/Pagination/Pagination";
import { HeadCell } from "../../components/shared/Table/utils/interfaces/interface";
import TableList from "../../components/TableList";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi, useCustomers } from "../../lib/mpApi";
import { Customer } from "../../types/Customer";
import { NextPageWithLayout } from "../_app";

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

const numberOfItemsPerPageList = [10, 20, 30, 40, 50];

const IndiceUsers: NextPageWithLayout = () => {
  /* TABLE RECORDS */
  const [items, setItems] = useState<Customer[]>([]);

  /* PAGINATE */
  const [pageIndex, setPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  /* FILTER BY NAME */
  const [filterName, setFilterName] = useState("");
  const [customerSelected, setCustomerSelected] = useState<{ id: string; nome: string; cognome: string }>();
  const [listCustomersName, setListCustomersName] = useState<string[]>([]);

  /* UTILS */
  const [loadingListAutocomplete, setLoadingListAutocomplete] = useState(false);
  const [loadingTableList, setLoadingTableList] = useState(false);

  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { data, error } = useCustomers(pageIndex, itemsPerPage, filterName);

  const handlePageChanged = (page: number) => {
    setPageIndex(page + 1);
  };

  useEffect(() => {
    if (data) {
      data.customers ? setItems(data.customers) : setItems([]);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  useEffect(() => {
    console.log("filterName", filterName);
  }, [filterName]);

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <h1 className="text-xl font-semibold text-gray-900">Clienti</h1>
      </div>

      {/* <Combobox
        listItems={listCustomersName}
        onSelectedChange={(customer: any) => setCustomerSelected(customer)}
        onFilterChange={(customer: string) => setFilterName(customer)}
        selectedName={customerSelected ? customerSelected?.nome + " " + customerSelected?.cognome : ""}
        loading={loadingListAutocomplete}
        selected={customerSelected?.nome}
        placeholder="Cerca un cliente"
      /> */}

      <div className="relative flex w-80 items-center justify-between gap-2 rounded-md bg-white  text-sm peer-focus:border-primary-600">
        <input
          className="peer w-full rounded-md border border-gray-300 bg-transparent py-1.5 pl-3 pr-9 outline-none focus:border-primary-600"
          placeholder="Cerca un cliente"
          value={filterName}
          onChange={(e: any) => setFilterName(e.target.value)}
        />
        <SearchIcon className="absolute right-3 h-4 w-4 text-gray-500 peer-focus:text-primary-600" />
      </div>

      {!items.length ? (
        <div className="h-60 w-full">
          <p className="m-auto"> Non sono presenti elementi. </p>
        </div>
      ) : (
        <>
          <TableList
            items={items}
            itemsHead={itemsHeadTable}
            onEditAction={(item) => router.push(`/users/edit?id=${item.id}`)}
            onDeleteAction={(item) =>
              mpApi.customers.actions
                .delete(Number(item.id))
                .finally(() => mutate(mpApi.customers.routes.list(pageIndex, itemsPerPage, filterName)))
            }
          />

          <Pagination
            currentPage={pageIndex}
            numberOfItems={itemsPerPage}
            totalItems={totalItems}
            totalPage={totalPages}
            showTotalPage={true}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            onPageChange={(page: number) => handlePageChanged(page)}
            onNumberOfItemsChange={(numberOfItems: number) => setItemsPerPage(numberOfItems)}
          />
        </>
      )}
    </div>
  );
};

IndiceUsers.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};

export default IndiceUsers;
