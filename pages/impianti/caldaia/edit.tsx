import SidebarLayout from "../../../layouts/SidebarLayout";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { mpApi } from "../../../lib/mpApi";
import { useForm, SubmitHandler, Path } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import renderError from "../../../lib/errorMessages";
import FourOFour from "../../../components/FourOFour";
import { useNotify, useAlert } from "../../../components/notifications";
import CheckboxInput from "../../../components/core/Checkbox";
import { NextPageWithLayout } from "../../_app";
import { Customer } from "../../../models/Customer";
import Combobox from "../../../components/shared/ComboBox/Combobox";
import { CheckIcon } from "@heroicons/react/solid";
import ComboBox, { ComboBoxElement } from "../../../components/ComboBox";

type ImpiantoCaldaia = {
  id: number;
  idUtente: number;
  marca: string;
  modello: string;
  alimentazione: number;
  dataInstallazione: string;
  dirittoFisso: number | string;
  longitudine: number;
  latitudine: number;
};

const defaultValues: ImpiantoCaldaia = {
  id: 0,
  idUtente: 0,
  marca: "",
  modello: "",
  alimentazione: 0,
  dataInstallazione: "",
  dirittoFisso: 0,
  longitudine: 0,
  latitudine: 0,
};

const EditImpiantiCaldaia: NextPageWithLayout = () => {
  const { push, query, pathname } = useRouter();
  const [item, setItem] = useState<ImpiantoCaldaia | null>(defaultValues);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [listCustomers, setListCustomers] = useState<Customer[]>([]);

  const [type, setType] = useState<"caldaia" | "condizionatore" | string>("");
  const [date, setDate] = useState<string>("");

  /* FILTER */
  const [filter, setFilter] = useState<string>("");

  /* UTILS */
  const [loading, setLoading] = useState<boolean>(false);

  const powerType: ComboBoxElement[] = [
    { label: "Metano", value: 0 },
    { label: "Gas", value: 1 },
  ];

  const [powerTypeSelected, setPowerTypeSelected] = useState(powerType[0].value);

  const [autoComputation, setAutoComputation] = useState(false);

  const alert = useAlert();

  const { register, handleSubmit, reset, setError, setValue, formState } = useForm<ImpiantoCaldaia>();

  const { errors } = formState;

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      reset(defaultValues);
      return null;
    } else {
      return mpApi.installations.actions
        .item(ItemId)
        .then((data: any) => {
          setItem(data);
          setPowerTypeSelected(data.alimentazione);
          setCustomer(new Customer(data.utente));
          setDate(data.dataInstallazione.split("/").reverse().join("-"));
          reset(data);
        })
        .catch((data: any) => {
          setItem(null);
          setPowerTypeSelected(powerType[0].value);
          setCustomer(null);
          setDate("");
          reset(defaultValues);
        });
    }
  };

  const onSubmit: SubmitHandler<ImpiantoCaldaia> = async (formdata: any, e: any) => {
    e.preventDefault();
    const apiAction = type === "caldaia" ? mpApi.installations.actions.saveBoiler : mpApi.installations.actions.saveAirConditioning;

    const newFormData: any = {
      ...formdata,
      dataInstallazione: formdata.dataInstallazione.split("-").reverse().join("/"),
      idUtente: customer?.id || 0,
      dirittoFisso: autoComputation ? -1 : formdata.dirittoFisso,
    };

    apiAction(newFormData)
      .then((response: any) => {
        alert({
          id: new Date().toISOString(),
          type: "success",
          title: "Salvataggio Risorsa",
          message: response.message,
          read: false,
          isAlert: true,
        });
        push(`/impianti/${type}/edit?id=` + response.data.id);
      })
      .catch((reason: any) => {
        alert({
          id: new Date().toISOString(),
          type: "error",
          title: "Salvataggio Risorsa",
          message: reason.message,
          read: false,
          isAlert: true,
        });

        reason?.data?.errors &&
          Object.keys(reason.data.errors).forEach((field: string) => {
            setError(field as Path<ImpiantoCaldaia>, {
              type: "custom",
              message: reason.data.errors[field],
            });
          });
      });
  };

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

  useEffect(() => {
    if (query.id) {
      const ItemId: number = Number(query.id);
      loadItem(ItemId);
    }
  }, [query]);

  useEffect(() => {
    if (pathname) {
      const path = pathname.split("/");
      if (path.indexOf("caldaia") > -1) {
        setType("caldaia");
      } else if (path.indexOf("condizionatore") > -1) {
        setType("condizionatore");
      }
    }
  }, [pathname]);

  useEffect(() => {
    setValue("dataInstallazione", date);
  }, [date, item]);

  useEffect(() => {
    setValue("alimentazione", Number(powerTypeSelected));
  }, [powerTypeSelected]);

  return item ? (
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-2xl font-bold leading-6 text-gray-900">{item?.id > 0 ? "CODICE: " + item.id : "Nuovo impianto"}</h3>
            <div className="mt-1 text-sm text-gray-500"></div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {item.id > 0 ? <input type="hidden" value={item?.id} {...register("id")} /> : null}

            <div className="col-span-6 flex flex-col items-start">
              {item.id == 0 ? (
                <>
                  <span className="block text-sm font-medium text-gray-700">Cerca Utente</span>
                  <Combobox
                    listItems={listCustomers}
                    onFilterChange={(filter) => setFilter(filter)}
                    onSelectedChange={(value) => setCustomer(value)}
                    selectedName={customer ? customer?.nome + " " + customer?.cognome + ", " + customer?.indirizzo : ""}
                    loading={loading}
                    selected={customer}
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
                </>
              ) : (
                <FormInput
                  label="Utente"
                  type="text"
                  value={customer ? customer?.nome + " " + customer?.cognome + ", " + customer?.indirizzo : ""}
                  disabled={true}
                  aria="utente"
                  name="Utente"
                />
              )}
            </div>

            {customer?.id && <input type="hidden" value={customer?.id} {...register("idUtente")} />}

            <FormInput
              className="sm:col-span-3"
              {...register("marca", { required: true })}
              errorMessage={renderError(errors["marca"])}
              autoComplete="marca"
              aria="Inserisci la Marca"
              label="Marca"
              defaultValue={item?.marca ?? ""}
            />

            <FormInput
              className="sm:col-span-3"
              {...register("modello", { required: true })}
              errorMessage={renderError(errors["modello"])}
              autoComplete="modello"
              aria="Inserisci il Modello"
              label="Modello"
              defaultValue={item?.modello ?? ""}
            />

            <FormInput
              className="sm:col-span-3"
              {...register("longitudine")}
              errorMessage={renderError(errors["longitudine"])}
              autoComplete="longitudine"
              aria="Inserisci la Longitudine"
              label="Longitudine"
              defaultValue={item?.longitudine ?? ""}
              type="number"
            />

            <FormInput
              className="sm:col-span-3"
              {...register("latitudine")}
              errorMessage={renderError(errors["latitudine"])}
              autoComplete="latitudine"
              aria="Inserisci la Latitudine"
              label="Latitudine"
              defaultValue={item?.latitudine ?? ""}
              type="number"
            />

            <ComboBox
              className="sm:col-span-3"
              aria="Seleziona Alimentazione"
              label="Alimentazione"
              value={powerTypeSelected}
              elements={powerType}
              name="Alimentazione"
              onChange={(e: any) => {
                setPowerTypeSelected(e.target.value);
              }}
            />

            <FormInput
              className="sm:col-span-3"
              {...register("dataInstallazione", { required: true })}
              errorMessage={renderError(errors["dataInstallazione"])}
              autoComplete="dataInstallazione"
              aria="Inserisci la Data di Installazione"
              label="Data di Installazione"
              value={date ?? ""}
              onChange={(e: any) => {
                setDate(e.target.value);
              }}
              type="date"
            />

            <FormInput
              className="sm:col-span-3"
              {...register("dirittoFisso")}
              errorMessage={renderError(errors["dirittoFisso"])}
              autoComplete="dirittoFisso"
              aria="Inserisci il Diritto Fisso di Chiamata"
              label="Diritto Fisso di Chiamata"
              defaultValue={Number(item?.dirittoFisso) ?? 0}
              type="number"
              disabled={autoComputation}
            />

            <CheckboxInput
              aria="Calcolo automatico"
              label="Calcolo automatico"
              name="calcolo-automatico"
              defaultChecked={autoComputation}
              onChange={(e) => setAutoComputation(e.target.checked)}
              className="mt-5 flex items-center whitespace-nowrap"
            />
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => reset()}
          >
            Annulla modifiche
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Salva
          </button>
        </div>
      </div>
    </form>
  ) : (
    <FourOFour title="Risorsa non trovata" description="Il contenuto che hai richiesto è stato rimosso oppure non esiste." />
  );
};

EditImpiantiCaldaia.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti - caldaia">{page}</SidebarLayout>;
};

export default EditImpiantiCaldaia;
