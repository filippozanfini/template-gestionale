import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { mpApi } from "../../lib/mpApi";
import CheckboxInput from "../../components/Checkbox";
import { useForm, SubmitHandler } from "react-hook-form";
import Textarea from "../../components/TextArea";
import PriceInput from "../../components/PriceInput";
import FormInput from "../../components/FormInput";
import renderError from "../../lib/errorMessages";
import FourOFour from "../../components/FourOFour";
import { useNotify, useAlert } from "../../components/notifications";

type Servizio = {
  id: number;
  nome: string;
  descrizione: string;
  costo: number;
  novita: boolean;
};

const defaultValues: Servizio = {
  id: 0,
  nome: "",
  descrizione: "",
  costo: 0,
  novita: false,
};

const EditServizi: NextPageWithLayout = () => {
  const { push, query } = useRouter();
  const [item, setItem] = useState<Servizio | null>(defaultValues);
  const notify = useNotify();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Servizio>();

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      reset(defaultValues);
      return null;
    } else {
      return mpApi.services.actions
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

  const onSubmit: SubmitHandler<Servizio> = async (formdata: any) => {
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
        push("/servizi/edit?id=" + response.data.id);
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
          setError(field as "id" | "nome" | "descrizione" | "costo" | "novita", {
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
            <h3 className="text-lg font-medium leading-6 text-gray-900">{item?.id > 0 ? "CODICE: " + item.id : "Nuovo Servizio"}</h3>
            <div className="mt-1 text-sm text-gray-500"></div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <input type="hidden" value={item?.id} {...register("id")} />
            <FormInput
              className="sm:col-span-3"
              {...register("nome", { required: true })}
              errorMessage={renderError(errors["nome"])}
              autoComplete="nome"
              aria="Inserisci il Nome"
              label="Nome"
              defaultValue={item?.nome ?? ""}
            />
            <PriceInput
              className="sm:col-span-3"
              {...register("costo", {
                required: true,
                min: { value: 0.1, message: "Il valore minimo è 0.1€" },
              })}
              errorMessage={renderError(errors["costo"])}
              autoComplete="costo"
              aria="costo"
              label="costo"
              defaultValue={item?.costo ?? ""}
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
              defaultChecked={item?.novita || false}
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

EditServizi.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Servizi">{page}</SidebarLayout>;
};

export default EditServizi;
