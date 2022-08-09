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
import { CheckIcon } from "@heroicons/react/solid";
import moment from "moment";

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
    numeroDiTelefono: "",
    indirizzo: "",
    latitudine: 0,
    longitudine: 0,
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
                    <div className="flex items-center gap-2">
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

            <div className="mt-10 flex justify-between">
              <FormInput
                className="sm:col-span-6"
                {...register("costo", { required: true })}
                errorMessage={renderError(errors["costo"])}
                autoComplete="costo"
                aria="Modifica il Costo"
                label="Costo"
                defaultValue={item?.costo ?? ""}
                type="number"
              />
              {item.id !== 0 && (
                <FormInput
                  className="sm:col-span-6"
                  aria="Modifica il Costo"
                  label="Stato Preventivo"
                  value={item.statoPreventivo}
                  type="text"
                  name="stato"
                  disabled
                />
              )}
              {item.id !== 0 && (
                <FormInput
                  className="sm:col-span-6"
                  aria="Modifica Data di Scadenza"
                  label="Data di Scadenza"
                  value={item.dataScadenza.toString()}
                  type="text"
                  name="data-di-scadenza"
                  disabled
                />
              )}
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
                    loading={loading}
                  >
                    {(item: Customer, selected, active) => (
                      <div className="flex items-center gap-4">
                        <span className={`block w-1/4 truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item.nome + " " + item.cognome}
                        </span>
                        <span className="w-1/3">{item.indirizzo}</span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary-600"}`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Combobox>
                </div>
              ) : null}

              {customer?.id && <input type="hidden" value={customer?.id} {...register("idUtente")} />}

              <Textarea
                className="sm:col-span-6"
                {...register("descrizione", { required: true })}
                errorMessage={renderError(errors["descrizione"])}
                autoComplete="descrizione"
                aria="Modifica la Descrizione"
                label="Descrizione"
                defaultValue={item?.descrizione ?? ""}
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
