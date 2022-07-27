import { ReactElement } from "react";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TableCustomers from "../../components/features/TableCustomers";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi, useCustomers } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const IndiceUsers: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate title="Clienti" useFetch={useCustomers} slugName="users" mpApiAction={mpApi.customers} Table={TableCustomers} />
  );
};

IndiceUsers.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};

export default IndiceUsers;
