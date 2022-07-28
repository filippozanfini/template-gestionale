import { ReactElement } from "react";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TableQuotes from "../../components/features/TableQuotes";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi, useQuotes } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const IndicePreventivi: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate
      title="Preventivi"
      useFetch={useQuotes}
      slugName="preventivi"
      mpApiAction={mpApi.quotes}
      Table={TableQuotes}
      isFilterable
    />
  );
};

IndicePreventivi.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Preventivi">{page}</SidebarLayout>;
};

export default IndicePreventivi;
