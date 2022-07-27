import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import useSWR, { useSWRConfig } from "swr";
import { mpApi } from "../../lib/mpApi";
import ActionList from "../../components/ActionList";
import { useRouter } from "next/router";

const IndicePacchetti: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(
    mpApi.packages.routes.list(),
    mpApi.packages.actions.listFetcher
  );
  return (
    <ActionList
      items={data}
      onEditAction={(item) => router.push(`/pacchetti/edit?id=${item.id}`)}
      onDeleteAction={(item) =>
        mpApi.packages.actions
          .delete(Number(item.id))
          .finally(() => mutate(mpApi.packages.routes.list()))
      }
    />
  );
};

IndicePacchetti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Pacchetti di manutenzione">{page}</SidebarLayout>;
};

export default IndicePacchetti;
