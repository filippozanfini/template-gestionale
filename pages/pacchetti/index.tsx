import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { mpApi, usePackages } from "../../lib/mpApi";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TablePackages from "../../components/features/TablePackages";

const IndicePacchetti: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate title="Pacchetti" useFetch={usePackages} slugName="pacchetti" mpApiAction={mpApi.packages} Table={TablePackages} />
  );
};

IndicePacchetti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Pacchetti di manutenzione">{page}</SidebarLayout>;
};

export default IndicePacchetti;
