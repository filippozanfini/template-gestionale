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

type ImpiantoSolareTermico = {
  id: number;
  idUtente: number;
  marca: string;
  dataInstallazione: string;
  dirittoFisso: string;
  tipoENumeroCollettori: string;
  tipoELitriBollitore: string;
  longitudine: string;
  latitudine: string;
  tipologiaCircolazione: string;
};

const defaultValues: ImpiantoSolareTermico = {
  id: 0,
  idUtente: 0,
  marca: "",
  dataInstallazione: "",
  dirittoFisso: "0",
  tipoENumeroCollettori: "",
  tipoELitriBollitore: "",
  longitudine: "",
  latitudine: "",
  tipologiaCircolazione: "",
};

const EditImpiantiSolareTermico: NextPageWithLayout = () => {
  const { push, query } = useRouter();
  const [item, setItem] = useState<ImpiantoSolareTermico | null>(defaultValues);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [listCustomers, setListCustomers] = useState<Customer[]>([]);
  /* FILTER */
  const [filter, setFilter] = useState<string>("");

  const [date, setDate] = useState<string>("");

  /* UTILS */
  const [loading, setLoading] = useState<boolean>(false);

  const [autoComputation, setAutoComputation] = useState(false);

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

  const alert = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ImpiantoSolareTermico>();

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      reset(defaultValues);
      return null;
    } else {
      return mpApi.installations.actions
        .item(ItemId)
        .then((data: any) => {
          setItem(data);
          setCustomer(new Customer(data.utente));
          setDate(data.dataInstallazione.split("/").reverse().join("-"));
          reset(data);
        })
        .catch((data: any) => {
          setItem(null);
          setDate("");
          setCustomer(null);
          reset(defaultValues);
        });
    }
  };

  const onSubmit: SubmitHandler<ImpiantoSolareTermico> = async (formdata: any, e: any) => {
    e.preventDefault();

    const newFormData: any = {
      ...formdata,
      dataInstallazione: formdata.dataInstallazione.split("-").reverse().join("/"),
      idUtente: customer?.id || 0,
      dirittoFisso: autoComputation ? -1 : formdata.dirittoFisso,
    };

    mpApi.installations.actions
      .saveSolarThermal(newFormData)
      .then((response: any) => {
        alert({
          id: new Date().toISOString(),
          type: "success",
          title: "Salvataggio Risorsa",
          message: response.message,
          read: false,
          isAlert: true,
        });
        push("/impianti/solare-termico/edit?id=" + response.data.id);
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
        Object.keys(reason.data.errors).forEach((field: string) => {
          setError(field as Path<ImpiantoSolareTermico>, {
            type: "custom",
            message: reason.data.errors[field],
          });
        });
      });
  };

  useEffect(() => {
    if (query.id) {
      const ItemId: number = Number(query.id);
      loadItem(ItemId);
    }
  }, [query]);

  useEffect(() => {
    setValue("dataInstallazione", date);
  }, [date, item]);

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
              {...register("tipoENumeroCollettori", { required: true })}
              errorMessage={renderError(errors["tipoENumeroCollettori"])}
              autoComplete="modello"
              aria="Inserisci il Tipo e il Numero Collettori"
              label="Tipo e Numero Collettori"
              defaultValue={item?.tipoENumeroCollettori ?? ""}
            />
            <FormInput
              className="sm:col-span-3"
              {...register("tipoELitriBollitore", { required: true })}
              errorMessage={renderError(errors["tipoELitriBollitore"])}
              autoComplete="modello"
              aria="Inserisci il Tipo e Litri Bollitore"
              label="Tipo e Litri Bollitore"
              defaultValue={item?.tipoELitriBollitore ?? ""}
            />
            <FormInput
              className="sm:col-span-3"
              {...register("dataInstallazione", { required: true })}
              errorMessage={renderError(errors["dataInstallazione"])}
              autoComplete="dataInstallazione"
              aria="Inserisci la Data di Installazione"
              label="Data di Installazione"
              defaultValue={item?.dataInstallazione ?? ""}
              type="date"
            />
            <FormInput
              className="sm:col-span-3"
              {...register("longitudine")}
              errorMessage={renderError(errors["longitudine"])}
              autoComplete="longitudine"
              aria="Inserisci la Longitudine"
              label="Longitudine"
              defaultValue={item?.longitudine ?? ""}
            />
            <FormInput
              className="sm:col-span-3"
              {...register("latitudine")}
              errorMessage={renderError(errors["latitudine"])}
              autoComplete="latitudine"
              aria="Inserisci la Latitudine"
              label="Latitudine"
              defaultValue={item?.latitudine ?? ""}
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

            <FormInput
              className="sm:col-span-3"
              {...register("tipologiaCircolazione", { required: true })}
              errorMessage={renderError(errors["tipologiaCircolazione"])}
              autoComplete="tipologiaCircolazione"
              aria="Inserisci la Tipologia Circolazione"
              label="Tipologia Circolazione"
              defaultValue={item?.tipologiaCircolazione ?? ""}
              type="text"
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

EditImpiantiSolareTermico.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti - solare termico">{page}</SidebarLayout>;
};

export default EditImpiantiSolareTermico;
