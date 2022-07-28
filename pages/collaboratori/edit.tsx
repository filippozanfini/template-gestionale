import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import { Customer } from "../../models/Customer";
import EditPage from "../../components/features/EditPage/EditPage";
import FormInput from "../../components/FormInput";
import CheckboxInput from "../../components/core/Checkbox";
import { mpApi } from "../../lib/mpApi";

const defaultValues: Customer = {
  id: 0,
  nome: "",
  cognome: "",
  email: "",
  tel: "",
  indirizzo: "",
  lat: 0,
  lon: 0,
  privacyAccettata: false,
  ruoli: [],
};

const EditUsers: NextPageWithLayout = () => {
  return (
    <EditPage<Customer> defaultValues={defaultValues} mpApiAction={mpApi.customers} slugName="clienti">
      {(item, register, renderError, errors) => {
        console.log("item", item);
        return item ? (
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {item.id === 0 ? (
                  "Nuovo Cliente"
                ) : (
                  <>
                    <span className="text-gray-600"> Cliente: </span>
                    <span className="text-xl font-semibold tracking-wide text-gray-900">{item.nome + " " + item.cognome}</span>
                  </>
                )}
              </h3>
              <div className="mt-1 text-sm text-gray-500"></div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <input type="hidden" value={item?.id} {...register("id")} />
              <FormInput
                className="sm:col-span-3"
                {...register("nome", { required: true })}
                errorMessage={renderError(errors["nome"])}
                autoComplete="nome"
                aria="Modifica il Nome"
                label="Nome"
                defaultValue={item?.nome ?? ""}
              />

              <FormInput
                className="sm:col-span-3"
                {...register("cognome", { required: true })}
                errorMessage={renderError(errors["cognome"])}
                autoComplete="cognome"
                aria="Modifica il Cognome"
                label="Cognome"
                defaultValue={item?.cognome ?? ""}
              />

              <FormInput
                className="sm:col-span-3"
                {...register("email", { required: true })}
                errorMessage={renderError(errors["email"])}
                autoComplete="email"
                aria="Modifica l'Email"
                label="Email"
                defaultValue={item?.email ?? ""}
                type="email"
              />

              <FormInput
                className="sm:col-span-3"
                {...register("tel", { required: true })}
                errorMessage={renderError(errors["tel"])}
                autoComplete="tel"
                aria="Modifica il numero di telefono"
                label="Telefono"
                defaultValue={item?.tel ?? ""}
                type="tel"
              />

              <FormInput
                className="sm:col-span-3"
                {...register("lat", { required: true })}
                errorMessage={renderError(errors["lat"])}
                autoComplete="lat"
                aria="Modifica la latitudine"
                label="Latitudine"
                defaultValue={item?.lat ?? ""}
              />

              <FormInput
                className="sm:col-span-3"
                {...register("lon", { required: true })}
                errorMessage={renderError(errors["lon"])}
                autoComplete="lon"
                aria="Modifica la longitudine"
                label="Longitudine"
                defaultValue={item?.lon ?? ""}
              />

              <FormInput
                className="sm:col-span-3"
                {...register("indirizzo", { required: true })}
                errorMessage={renderError(errors["indirizzo"])}
                autoComplete="indirizzo"
                aria="Modifica l'indirizzo"
                label="Indirizzo"
                defaultValue={item?.indirizzo ?? ""}
              />

              <CheckboxInput
                className="sm:col-span-4"
                {...register("privacyAccettata")}
                aria="Inserisci novita"
                label="Privacy"
                defaultChecked={Boolean(item?.privacyAccettata) || false}
              />
            </div>
          </div>
        ) : (
          <></>
        );
      }}
    </EditPage>
  );
};
EditUsers.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};
export default EditUsers;
