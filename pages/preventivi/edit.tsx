import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";

import { eQuoteStatus, IQuote, Quote } from "../../models/Quote";
import EditPage from "../../components/features/EditPage/EditPage";
import { mpApi } from "../../lib/mpApi";
import FormInput from "../../components/FormInput";

const defaultValues: IQuote = {
  id: 0,
  costo: 0,
  dataScadenza: new Date(),
  descrizione: "",
  statoPreventivo: eQuoteStatus.none,
};

const EditPreventivi: NextPageWithLayout = () => {
  return (
    <EditPage<IQuote> defaultValues={defaultValues} mpApiAction={mpApi.quotes} slugName="preventivi">
      {(item, register, renderError, errors) => {
        console.log("item", item);
        return item ? (
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {item.id === 0 ? (
                  "Nuovo Preventivo"
                ) : (
                  <>
                    <span className="text-gray-600"> Preventivo: </span>
                    <span className="text-xl font-semibold tracking-wide text-gray-900">{item.descrizione}</span>
                  </>
                )}
              </h3>
              <div className="mt-1 text-sm text-gray-500"></div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <input type="hidden" value={item?.id} {...register("id")} />
              <FormInput
                className="sm:col-span-3"
                {...register("descrizione", { required: true })}
                errorMessage={renderError(errors["descrizione"])}
                autoComplete="descrizione"
                aria="Modifica la Descrizione"
                label="Descrizione"
                defaultValue={item?.descrizione ?? ""}
              />

              <FormInput
                className="sm:col-span-3"
                {...register("costo", { required: true })}
                errorMessage={renderError(errors["costo"])}
                autoComplete="costo"
                aria="Modifica il Costo"
                label="Costo"
                defaultValue={item?.costo ?? ""}
              />

              <FormInput
                className="sm:col-span-3"
                {...register("dataScadenza", { required: true })}
                errorMessage={renderError(errors["dataScadenza"])}
                autoComplete="dataScadenza"
                aria="Modifica la Data Scadenza"
                label="Data Scadenza"
                defaultValue={item?.dataScadenza ?? ""}
              />
            </div>
          </div>
        ) : null;
      }}
    </EditPage>
  );
};
EditPreventivi.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Preventivi">{page}</SidebarLayout>;
};
export default EditPreventivi;
