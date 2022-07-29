import { ReactElement } from "react";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TableOrders from "../../components/features/TableOrders";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi, useOrders } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const IndiceOrdini: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate title="Ordini" useFetch={useOrders} slugName="ordini" mpApiAction={mpApi.orders} Table={TableOrders} isFilterable />
  );
};

IndiceOrdini.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Ordini">{page}</SidebarLayout>;
};

export default IndiceOrdini;
