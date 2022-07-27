import { ReactElement } from "react";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TablePreventivi from "../../components/features/TablePreventivi";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi, usePreventivi } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const IndicePreventivi: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate
      title="Preventivi"
      useFetch={usePreventivi}
      slugName="preventivi"
      mpApiAction={mpApi.preventivi}
      Table={TablePreventivi}
    />
  );
};

IndicePreventivi.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Preventivi">{page}</SidebarLayout>;
};

export default IndicePreventivi;
