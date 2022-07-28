import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import useSWR, { useSWRConfig } from "swr";
import { mpApi, useInstallations } from "../../lib/mpApi";
import ActionList from "../../components/ActionList";
import { useRouter } from "next/router";
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
    />
  );
};

IndiceImpianti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti">{page}</SidebarLayout>;
};

export default IndiceImpianti;
