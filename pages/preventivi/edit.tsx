import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useState } from "react";

import { eQuoteStatus, IQuote, Quote } from "../../models/Quote";
import EditPage from "../../components/features/EditPage/EditPage";
import { mpApi, useCustomers } from "../../lib/mpApi";
import FormInput from "../../components/FormInput";
import { Customer } from "../../models/Customer";
import Textarea from "../../components/TextArea";
import Combobox from "../../components/shared/ComboBox/Combobox";

const defaultValues: IQuote = {
  id: 0,
  costo: 0,
  dataScadenza: new Date(),
  descrizione: "",
  statoPreventivo: eQuoteStatus.none,
  utente: {
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
  },
};

const EditPreventivi: NextPageWithLayout = () => {
  /* ITEM */
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [listCustomers, setListCustomers] = useState<Customer[]>([]);

  /* FILTER */
  const [filter, setFilter] = useState<string>("");

  /* UTILS */
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res: any = await mpApi.customers.actions.autocomplete(1, 25, filter);

      const resCustomer = res.content;

      setListCustomers(resCustomer);
      setLoading(false);
    };

    fetchData();
  }, [filter]);

  return (
    <EditPage<IQuote> defaultValues={defaultValues} mpApiAction={mpApi.quotes} slugName="preventivi">
      {(item: Quote, register, renderError, errors) => {
        return item ? (
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {item.id === 0 ? (
                  "Nuovo Preventivo"
                ) : (
                  <>
                    <div className="flex gap-2">
                      <span className="text-gray-600"> Preventivo: </span>
                      <span className="text-xl font-semibold tracking-wide text-gray-900">
                        {item.utente?.nome + " " + item.utente?.cognome}
                      </span>
                      <span className="text-xl font-semibold tracking-wide text-gray-900">{item.dataScadenza.toString()}</span>
                    </div>
                  </>
                )}
              </h3>
              <div className="mt-1 text-sm text-gray-500"></div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <input type="hidden" value={item?.id} {...register("id")} />

              {/* SE SI STA CREANDO UN PREVENTIVO  */}
              {item.id == 0 ? (
                <div className="col-span-5 flex flex-col items-start">
                  <span className="block text-sm font-medium text-gray-700">Cerca Utente</span>
                  <Combobox
                    listItems={listCustomers}
                    onFilterChange={(filter) => setFilter(filter)}
                    onSelectedChange={(value) => setCustomer(value)}
                    selectedName={customer ? customer?.nome + " " + customer?.cognome + "     " + customer?.indirizzo : ""}
                  >
                    {(item: Customer, selected, active) => (
                      <div className="flex items-center gap-4">
                        <span className="w-1/4">{item.nome + " " + item.cognome}</span>
                        <span className="w-1/3">{item.indirizzo}</span>
                      </div>
                    )}
                  </Combobox>
                  <input type="hidden" value={customer?.id} {...register("idUtente")} />
                </div>
              ) : null}

              <FormInput
                className="sm:col-span-1"
                {...register("costo", { required: true })}
                errorMessage={renderError(errors["costo"])}
                autoComplete="costo"
                aria="Modifica il Costo"
                label="Costo"
                defaultValue={item?.costo ?? ""}
                type="number"
              />

              <Textarea
                className="sm:col-span-6"
                {...register("descrizione", { required: true })}
                errorMessage={renderError(errors["descrizione"])}
                autoComplete="descrizione"
                aria="Modifica la Descrizione"
                label="Descrizione"
                defaultValue={item?.descrizione ?? ""}
              />

              {/* <FormInput
                className="sm:col-span-3"
                {...register("dataScadenza", { required: true })}
                errorMessage={renderError(errors["dataScadenza"])}
                autoComplete="dataScadenza"
                aria="Modifica la Data Scadenza"
                label="Data Scadenza"
                defaultValue={item?.dataScadenza ?? ""}
              /> */}
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
