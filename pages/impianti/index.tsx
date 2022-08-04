import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { mpApi, useInstallations } from "../../lib/mpApi";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TableInstallations from "../../components/features/TableInstallations";

const IndiceImpianti: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate
      title="Impianti"
      useFetch={useInstallations}
      slugName="impianti"
      mpApiAction={mpApi.installations}
      Table={TableInstallations}
      isFilterableByUser
    />
  );
};

IndiceImpianti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti">{page}</SidebarLayout>;
};

export default IndiceImpianti;
