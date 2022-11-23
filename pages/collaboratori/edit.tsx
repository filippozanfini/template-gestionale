import { ReactElement } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";
import EditClienti from "../clienti/edit";

const EditCollaboratori = () => {
  return <EditClienti />;
};

EditCollaboratori.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Collaboratori">{page}</SidebarLayout>;
};

export default EditCollaboratori;
