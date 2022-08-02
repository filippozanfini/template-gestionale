import SidebarLayout from "../../../layouts/SidebarLayout";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { mpApi } from "../../../lib/mpApi";
import { useForm, SubmitHandler } from "react-hook-form";
import Textarea from "../../../components/TextArea";
import PriceInput from "../../../components/PriceInput";
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
  marca: string;
  modello: string;
  alimentazione: string;
  dataInstallazione: string;
  dirittoFissoChiamata: string;
};

const defaultValues: ImpiantoCaldaia = {
  id: 0,
  marca: "",
  modello: "",
  alimentazione: "",
  dataInstallazione: "",
  dirittoFissoChiamata: "0",
};

const EditImpiantiCaldaia: NextPageWithLayout = () => {
  const { push, query } = useRouter();
  const [item, setItem] = useState<ImpiantoCaldaia | null>(defaultValues);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [listCustomers, setListCustomers] = useState<Customer[]>([]);
  /* FILTER */
  const [filter, setFilter] = useState<string>("");

  /* UTILS */
  const [loading, setLoading] = useState<boolean>(false);

  const powerType: ComboBoxElement[] = [
    { label: "Metano", value: 0 },
    { label: "Gas", value: 1 },
  ];
  const [powerTypeSelected, setPowerTypeSelected] = useState("");

  const [autoComputation, setAutoComputation] = useState(true);

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
  const notify = useNotify();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ImpiantoCaldaia>();

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      reset(defaultValues);
      return null;
    } else {
      return mpApi.installations.actions
        .item(ItemId)
        .then((data: any) => {
          setItem(data);
          reset(data);
        })
        .catch((data: any) => {
          setItem(null);
          reset(defaultValues);
        });
    }
  };

  const onSubmit: SubmitHandler<ImpiantoCaldaia> = async (formdata: any) => {
    notify({
      id: new Date().toISOString(),
      type: "success",
      title: "Salvataggio Risorsa",
      message: "Prova",
      read: false,
      isAlert: false,
    });
    mpApi.services.actions
      .save(formdata)
      .then((response: any) => {
        alert({
          id: new Date().toISOString(),
          type: "success",
          title: "Salvataggio Risorsa",
          message: response.message,
          read: false,
          isAlert: true,
        });
        push("/impianti/caldaia/edit?id=" + response.data.id);
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
          setError(field as "id" | "marca" | "modello" | "alimentazione" | "dataInstallazione" | "dirittoFissoChiamata", {
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

  return item ? (
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">{item?.id > 0 ? "CODICE: " + item.id : "Nuovo impianto"}</h3>
            <div className="mt-1 text-sm text-gray-500"></div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <input type="hidden" value={item?.id} {...register("id")} />
            <div className="col-span-6 flex flex-col items-start">
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
                      <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary-600"}`}>
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                )}
              </Combobox>
            </div>
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
            <ComboBox
              className="sm:col-span-3"
              aria="Seleziona Alimentazione"
              label="Alimentazione"
              value={powerTypeSelected}
              elements={powerType}
              name="Alimentazione"
              onSelect={(value: any) => setPowerTypeSelected(value)}
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
              {...register("dirittoFissoChiamata", { required: true })}
              errorMessage={renderError(errors["dirittoFissoChiamata"])}
              autoComplete="dirittoFissoChiamata"
              aria="Inserisci il Diritto Fisso di Chiamata"
              label="Diritto Fisso di Chiamata"
              value={item?.dirittoFissoChiamata ?? 0}
              type="number"
              min={0}
              max={1}
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
