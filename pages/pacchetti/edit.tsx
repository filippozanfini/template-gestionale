import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { mpApi } from "../../lib/mpApi";
import { useForm, SubmitHandler } from "react-hook-form";
import Textarea from "../../components/TextArea";
import PriceInput from "../../components/PriceInput";
import FormInput from "../../components/FormInput";
import renderError from "../../lib/errorMessages";
import FourOFour from "../../components/FourOFour";
import { useNotify, useAlert } from "../../components/notifications";
import CheckboxInput from "../../components/core/Checkbox";
import { Package } from "../../models/Package";
import ComboBoxInput from "../../components/ComboBoxInput";

const defaultValues: Package = {
  id: 0,
  nome: "",
  descrizione: "",
  categorie: [],
  costo: 0,
  novita: false,
};

const EditPacchetti: NextPageWithLayout = () => {
  const { push, query } = useRouter();
  const [item, setItem] = useState<Package | null>(defaultValues);
  const [itemCategory, setItemCategory] = useState<string[]>([]);
  const [itemNovita, setItemNovita] = useState(false);
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

  const onSubmit: SubmitHandler<Package> = async (formdata: any) => {
    notify({
      id: new Date().toISOString(),
      type: "success",
      title: "Salvataggio Risorsa",
      message: "Prova",
      read: false,
      isAlert: false,
    });

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
          setError(field as "id" | "nome" | "descrizione" | "costo" | "novita" | "categorie", {
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
    if (item) {
      setItemNovita(item.novita);

      if (item.categorie) {
        console.log("FROM ITEM", item.categorie);

        setItemCategory(item.categorie);
        setValue("categorie", item.categorie);
      }
    }
  }, [item]);

  const selectCategoryHandler = (categorySelected: any[]) => {
    setItemCategory(categorySelected);
    setValue("categorie", categorySelected);
  };

  return item ? (
    <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {item?.id > 0 ? "CODICE: " + item.id : "Nuovo pacchetto manutenzione"}
            </h3>
            <div className="mt-1 text-sm text-gray-500"></div>
          </div>
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
              onChange={() => setItemNovita(!itemNovita)}
              defaultChecked={itemNovita}
              checked={itemNovita}
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

EditPacchetti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Pacchetti di manutenzione">{page}</SidebarLayout>;
};

export default EditPacchetti;
