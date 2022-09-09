import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import SidebarLayout from "../../layouts/SidebarLayout";
import { Order } from "../../models/Order";

interface INewOrder {}

const NewOrdine = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<INewOrder>();

  return <div>NewOrdine</div>;
};

NewOrdine.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Nuovo Ordine">{page}</SidebarLayout>;
};
export default NewOrdine;
