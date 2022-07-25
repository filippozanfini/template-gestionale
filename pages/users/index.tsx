import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { useSWRConfig } from "swr";
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
  const [items, setItems] = useState<Customer[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const router = useRouter();
  const { mutate } = useSWRConfig();

  const { data, error } = useCustomers(pageIndex, itemsPerPage);

  const handlePageChanged = (page: number) => {
    const newPageIndex = page + 1 ? page + 1 : 1;
    setPageIndex(newPageIndex);
  };

  useEffect(() => {
    if (data) {
      data.customers ? setItems(data.customers) : setItems([]);

      setTotalItems(data.totalItems);
      setTotalPage(data.totalPages);
    }
  }, [data]);

  if (!data?.customers) {
    return <div className="flex h-full w-full items-center justify-center">Loading...</div>;
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <TableList
        items={items}
        itemsHead={itemsHeadTable}
        onEditAction={(item) => router.push(`/users/edit?id=${item.id}`)}
        onDeleteAction={(item) =>
          mpApi.customers.actions
            .delete(Number(item.id))
            .finally(() => mutate(mpApi.customers.routes.list(pageIndex, itemsPerPage)))
        }
      />

      <Pagination
        currentPage={pageIndex}
        numberOfItems={itemsPerPage}
        totalItems={totalItems}
        totalPage={totalPage}
        showTotalPage={true}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        onPageChange={(page: number) => handlePageChanged(page)}
        onNumberOfItemsChange={(numberOfItems: number) => setItemsPerPage(numberOfItems)}
      />
    </div>
  );
};

IndiceUsers.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};

export default IndiceUsers;
