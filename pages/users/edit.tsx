import React, { ReactElement } from "react";
import SidebarLayout from "../../layouts/SidebarLayout";

const EditUsers = () => {
  return <div>EditUsers</div>;
};

EditUsers.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};
export default EditUsers;
