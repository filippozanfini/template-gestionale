import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import useSWR, { useSWRConfig } from "swr";
import { mpApi } from "../../lib/mpApi";
import ActionList from "../../components/ActionList";
import { useRouter } from "next/router";

const IndiceImpianti: NextPageWithLayout = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(
    mpApi.installations.routes.list(),
    mpApi.installations.actions.listFetcher
  );
  return (
    <ActionList
      items={data}
      onEditAction={(item) => router.push(`/impianti/edit?id=${item.id}`)}
      onDeleteAction={(item) =>
        mpApi.installations.actions
          .delete(Number(item.id))
          .finally(() => mutate(mpApi.packages.routes.list()))
      }
    />
  );
};

IndiceImpianti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti">{page}</SidebarLayout>;
};

export default IndiceImpianti;
