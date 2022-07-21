import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import ActionTableList from "../../components/ActionTableList";
import { HeadCell } from "../../components/shared/Table/utils/interfaces/interface";
import TableList from "../../components/TableList";
import SidebarLayout from "../../layouts/SidebarLayout";
import { useCustomers } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const itemsHeaderTable: HeadCell[] = [
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

const IndiceUsers: NextPageWithLayout = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const { customers, error } = useCustomers(pageIndex);

  if (!customers) {
    return <div className="flex h-full w-full items-center justify-center">Loading...</div>;
  }

  return <TableList items={customers} itemsHead={itemsHeaderTable} />;
};

IndiceUsers.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};

export default IndiceUsers;
