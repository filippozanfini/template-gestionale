import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import useSWR, { useSWRConfig } from "swr";
import { mpApi } from "../../lib/mpApi";
import ActionList from "../../components/ActionList";
import { useRouter } from "next/router";

const IndiceCategorieManutenzione: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(
    mpApi.manutenzione.routes.list(),
    mpApi.manutenzione.actions.listFetcher
  );
  return (
    <ActionList
      items={data}
    />
  );
};

IndiceCategorieManutenzione.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Categorie">{page}</SidebarLayout>;
};

export default IndiceCategorieManutenzione;
