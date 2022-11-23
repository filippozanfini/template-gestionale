import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import useSWR, { useSWRConfig } from "swr";
import { mpApi, useService, useServices } from "../../lib/mpApi";
import ActionList from "../../components/ActionList";
import { useRouter } from "next/router";
import TableServices from "../../components/features/TableServices";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";

const IndiceServizi: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate title="Servizi" useFetch={useServices} slugName="servizi" mpApiAction={mpApi.services} Table={TableServices} />
  );
};

IndiceServizi.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Servizi">{page}</SidebarLayout>;
};

export default IndiceServizi;
