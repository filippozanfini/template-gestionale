import { ReactElement } from "react";
import SidebarLayout from "../../../layouts/SidebarLayout";
import EditImpiantiCaldaia from "../caldaia/edit";

const EditImpiantiCondizionatore = () => {
  return <EditImpiantiCaldaia />;
};

EditImpiantiCondizionatore.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti - condizionatore">{page}</SidebarLayout>;
};

export default EditImpiantiCondizionatore;
