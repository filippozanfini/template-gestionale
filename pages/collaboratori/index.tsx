import { ReactElement } from "react";
import IndexTableTemplate from "../../components/features/IndexTableTemplate/IndexTableTemplate";
import TableCustomers from "../../components/features/TableCustomers";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi, useCollaborators, useCustomers } from "../../lib/mpApi";
import { NextPageWithLayout } from "../_app";

const IndiceUsers: NextPageWithLayout = () => {
  return (
    <IndexTableTemplate
      title="Collaboratori"
      useFetch={useCollaborators}
      slugName="collaboratori"
      mpApiAction={mpApi.collaborators}
      Table={TableCustomers}
      isFilterable
    />
  );
};

IndiceUsers.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};

export default IndiceUsers;
