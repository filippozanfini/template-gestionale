import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import useSWR, { useSWRConfig } from "swr";
import { mpApi } from "../../lib/mpApi";
import ActionList, { ActionListItem } from "../../components/ActionList";
import { useRouter } from "next/router";

const IndiceCategorieManutenzione: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(mpApi.manutenzione.routes.list(), mpApi.manutenzione.actions.listFetcher);

  console.log("DATA", data);

  return <ActionList items={data?.content as ActionListItem[]} />;
};

IndiceCategorieManutenzione.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Categorie">{page}</SidebarLayout>;
};

export default IndiceCategorieManutenzione;
