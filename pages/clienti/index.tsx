import { ReactElement } from "react";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TableCustomers from "../../components/features/TableCustomers";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi, useCustomers } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const IndiceClienti: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate
      title="Clienti"
      useFetch={useCustomers}
      slugName="clienti"
      mpApiAction={mpApi.customers}
      Table={TableCustomers}
      isFilterableByUser
    />
  );
};

IndiceClienti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Utenti">{page}</SidebarLayout>;
};

export default IndiceClienti;
