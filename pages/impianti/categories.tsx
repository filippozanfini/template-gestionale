import { ReactElement } from "react";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TableInstallationsCategories from "../../components/features/TableInstallationsCategories";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi, useCategories } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const IndiceOrdini: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate
      title="Categorie"
      useFetch={useCategories}
      slugName="impianti"
      mpApiAction={mpApi.categories}
      Table={TableInstallationsCategories}
    />
  );
};

IndiceOrdini.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Categorie">{page}</SidebarLayout>;
};

export default IndiceOrdini;
