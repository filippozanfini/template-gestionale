import React from "react";
import FormCoordinateBancarie from "../../components/features/Impostazioni/FormCoordinateBancarie/FormCoordinateBancarie";
import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";

const Impostazioni: NextPageWithLayout = () => {
  return (
    <div>
      <div>
        <h2 className="text-xl font-medium">Coordinate Bancarie</h2>
        <FormCoordinateBancarie />
      </div>
    </div>
  );
};

Impostazioni.getLayout = function getLayout(page: React.ReactElement) {
  return <SidebarLayout title="Impostazioni">{page}</SidebarLayout>;
};

export default Impostazioni;
