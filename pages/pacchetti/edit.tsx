import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { LegacyRef, ReactElement, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { mpApi } from "../../lib/mpApi";
import { useForm, SubmitHandler, Path } from "react-hook-form";
import Textarea from "../../components/TextArea";
import PriceInput from "../../components/PriceInput";
import FormInput from "../../components/FormInput";
import renderError from "../../lib/errorMessages";
import FourOFour from "../../components/FourOFour";
import { useNotify, useAlert } from "../../components/notifications";
import CheckboxInput from "../../components/core/Checkbox";
import { Package } from "../../models/Package";
import ComboBoxInput from "../../components/ComboBoxInput";
import { Tab } from "@headlessui/react";

const defaultValues: Package = {
  id: 0,
  nome: "",
  descrizione: "",
  categorie: [],
  costo: 0,
  novita: false,
  tensione: "",
  potenzaMin: 0.0,
  potenzaMax: 0.0,
};

const EditPacchetti: NextPageWithLayout = () => {
  const { push, query } = useRouter();
  const [item, setItem] = useState<Package | null>(defaultValues);
  const [itemCategory, setItemCategory] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const notify = useNotify();
  const alert = useAlert();

  const categories: any[] = [
    { label: "Condizionatore", value: 1 },
    { label: "Caldaia", value: 2 },
    { label: "Impianto Solare Termico", value: 4 },
    { label: "Pompa Di Calore", value: 5 },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<Package>();

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      reset(defaultValues);
      return null;
    } else {
      return mpApi.packages.actions
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

  const onSubmit: SubmitHandler<Package> = async (formdata: any, e: any) => {
    e.preventDefault();
    notify({
      id: new Date().toISOString(),
      type: "success",
      title: "Salvataggio Risorsa",
      message: "Prova",
      read: false,
      isAlert: false,
    });

    if (tabIndex === 0) {
      mpApi.packages.actions
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
          push("/pacchetti/edit?id=" + response.data.id);
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
            setError(field as "id" | "nome" | "descrizione" | "costo" | "novita" | "categorie" | "tensione" | "potenzaMin" | "potenzaMax", {
              type: "custom",
              message: reason.data.errors[field],
            });
          });
        });
    } else {
      mpApi.packages.actions
        .saveFotovoltaico(formdata)
        .then((response: any) => {
          alert({
            id: new Date().toISOString(),
            type: "success",
            title: "Salvataggio Risorsa",
            message: response.message,
            read: false,
            isAlert: true,
          });
          push("/pacchetti/edit?id=" + response.data.id);
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
            setError(field as "id" | "nome" | "descrizione" | "costo" | "novita" | "categorie" | "tensione" | "potenzaMin" | "potenzaMax", {
              type: "custom",
              message: reason.data.errors[field],
            });
          });
        });
    }
  };

  useEffect(() => {
    if (query.id) {
      const ItemId: number = Number(query.id);
      loadItem(ItemId);
    } else {
      reset(defaultValues);
      setItem(defaultValues);
      setTabIndex(0);
    }
  }, [query]);

  useEffect(() => {
    if (item) {
      if (item.categorie) {
        setItemCategory(item.categorie);
        setValue("categorie", item.categorie);

        if (item.categorie.find((c: any) => c === 3)) {
          setTabIndex(1);
        }
      }
    }
  }, [item]);

  useEffect(() => {
    if (!query.id) {
      reset(defaultValues);
    }
  }, [tabIndex]);

  const selectCategoryHandler = (categorySelected: any[]) => {
    setItemCategory(categorySelected);
    setValue("categorie", categorySelected);
  };

  return item ? (
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-4xl font-bold leading-6 text-gray-900">
              {item?.id > 0 ? "CODICE: " + item.id : "Nuovo pacchetto manutenzione"}
            </h3>
            <div className="mt-10">
              <Tab.Group selectedIndex={tabIndex} onChange={(index: number) => setTabIndex(index)}>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                  <Tab
                    className={({ selected }) =>
                      `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-900/20 focus:outline-none ${
                        selected ? "bg-white shadow" : "text-gray-50 hover:bg-white/[0.12] hover:text-white"
                      }`
                    }
                    disabled={item.categorie.find((c: any) => c === 3) ? true : false}
                  >
                    Altri impianti
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-900/20 focus:outline-none ${
                        selected ? "bg-white shadow" : "text-gray-50 hover:bg-white/[0.12] hover:text-white"
                      }`
                    }
                    disabled={item.categorie.length > 0 && !item.categorie.find((c: any) => c === 3) ? true : false}
                  >
                    Impianto Fotovoltaico
                  </Tab>
                </Tab.List>
              </Tab.Group>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <input type="hidden" value={item?.id} {...register("id")} />
                <FormInput
                  className="sm:col-span-2"
                  {...register("nome", { required: true })}
                  errorMessage={renderError(errors["nome"])}
                  autoComplete="nome"
                  aria="Inserisci il Nome"
                  label="Nome"
                  defaultValue={item?.nome ?? ""}
                />
                <PriceInput
                  className="sm:col-span-2"
                  {...register("costo", {
                    required: true,
                    min: { value: 0.1, message: "Il valore minimo è 0.1€" },
                  })}
                  errorMessage={renderError(errors["costo"])}
                  autoComplete="costo"
                  aria="costo"
                  label="Costo"
                  defaultValue={item?.costo ?? ""}
                />

                {tabIndex === 0 ? (
                  <ComboBoxInput
                    elements={categories}
                    {...register("categorie", { required: true })}
                    value={itemCategory}
                    selectedOptions={itemCategory}
                    aria="combobox"
                    label="Categoria"
                    name="categoria"
                    onChange={selectCategoryHandler}
                  />
                ) : (
                  <FormInput
                    className="sm:col-span-2"
                    {...register("tensione", { required: true })}
                    errorMessage={renderError(errors["tensione"])}
                    autoComplete="tensione"
                    aria="Inserisci la Tensione"
                    label="Tensione"
                    defaultValue={item?.tensione ?? ""}
                  />
                )}
                {tabIndex === 1 && (
                  <FormInput
                    className="sm:col-span-3"
                    {...register("potenzaMin", { required: true })}
                    errorMessage={renderError(errors["potenzaMin"])}
                    autoComplete="potenzaMin"
                    aria="Inserisci la Potenza minima"
                    label="Potenza minima"
                    defaultValue={item?.potenzaMin ?? ""}
                  />
                )}
                {tabIndex === 1 && (
                  <FormInput
                    className="sm:col-span-3"
                    {...register("potenzaMax", { required: true })}
                    errorMessage={renderError(errors["potenzaMax"])}
                    autoComplete="potenzaMax"
                    aria="Inserisci la Potenza massima"
                    label="Potenza massima"
                    defaultValue={item?.potenzaMax ?? ""}
                  />
                )}
                <Textarea
                  className="sm:col-span-6"
                  {...register("descrizione", { required: true })}
                  errorMessage={renderError(errors["descrizione"])}
                  autoComplete="descrizione"
                  aria="Descrizione"
                  label="Descrizione"
                  defaultValue={item?.descrizione ?? ""}
                />
                <CheckboxInput
                  className="sm:col-span-4"
                  {...register("novita")}
                  aria="Inserisci novita"
                  label="Novità"
                  aria-checked={item?.novita}
                />
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-500"></div>
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

EditPacchetti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Pacchetti di manutenzione">{page}</SidebarLayout>;
};

export default EditPacchetti;
