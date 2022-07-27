import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { mpApi, usePackages } from "../../lib/mpApi";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TablePreventivi from "../../components/features/TablePreventivi";

const IndicePacchetti: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate
      title="Pacchetti"
      useFetch={usePackages}
      slugName="pacchetti"
      mpApiAction={mpApi.preventivi}
      Table={TablePreventivi}
    />
  );
};

IndicePacchetti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Pacchetti di manutenzione">{page}</SidebarLayout>;
};

export default IndicePacchetti;
