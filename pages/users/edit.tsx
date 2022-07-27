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
import { Customer, ICustomer } from "../../types/Customer";

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
  const { push, query } = useRouter();
  const [item, setItem] = useState<Customer | null>(defaultValues);
  const notify = useNotify();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Customer>();

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      reset(defaultValues);
      return null;
    } else {
      return mpApi.customers.actions
        .customer(String(ItemId))
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

  const onSubmit: SubmitHandler<Customer> = async (formdata: ICustomer) => {
    const formdataMap: ICustomer = {
      id: item?.id ?? 0,
      nome: formdata.nome !== item?.nome ? formdata.nome : undefined,
      cognome: formdata.cognome !== item?.cognome ? formdata.cognome : undefined,
      email: formdata.email !== item?.email ? formdata.email : undefined,
      tel: formdata.tel !== item?.tel ? formdata.tel : undefined,
      privacyAccettata: formdata.privacyAccettata !== item?.privacyAccettata ? formdata.privacyAccettata : undefined,
      ruoli: formdata.ruoli !== item?.ruoli ? formdata.ruoli : undefined,
      indirizzo: formdata.indirizzo !== item?.indirizzo ? formdata.indirizzo : undefined,
      lat: formdata.lat !== item?.lat ? formdata.lat : undefined,
      lon: formdata.lon !== item?.lon ? formdata.lon : undefined,
    };

    Object.keys(formdataMap).forEach((key) => {
      if (formdataMap[key as keyof ICustomer] === undefined) {
        delete formdataMap[key as keyof ICustomer];
      }
    });

    notify({
      id: new Date().toISOString(),
      type: "success",
      title: "Salvataggio Risorsa",
      message: "Prova",
      read: false,
      isAlert: false,
    });
    mpApi.customers.actions
      .save(formdataMap)
      .then((response: any) => {
        alert({
          id: new Date().toISOString(),
          type: "success",
          title: "Salvataggio Risorsa",
          message: response.message,
          read: false,
          isAlert: true,
        });
        push("/users/edit/?id=" + response.id);
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

        if (reason && reason.data && reason.data.errors) {
          Object.keys(reason?.data?.errors).forEach((field: string) => {
            setError(field as "id" | "nome" | "cognome" | "email" | "indirizzo" | "lat" | "lon" | "tel" | "ruoli" | "privacyAccettata", {
              type: "custom",
              message: reason.data.errors[field],
            });
          });
        }
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
              {...register("indirizzo", { required: true })}
              errorMessage={renderError(errors["indirizzo"])}
              autoComplete="indirizzo"
              aria="Modifica l'indirizzo"
              label="Indirizzo"
              defaultValue={item?.indirizzo ?? ""}
            />

            <FormInput
              className="sm:col-span-3"
              {...register("lat", { required: true })}
              errorMessage={renderError(errors["lat"])}
              autoComplete="lat"
              aria="Modifica la latitudine"
              label="lat"
              defaultValue={item?.lat ?? ""}
            />

            <FormInput
              className="sm:col-span-3"
              {...register("lon", { required: true })}
              errorMessage={renderError(errors["lon"])}
              autoComplete="lon"
              aria="Modifica la longitudine"
              label="lon"
              defaultValue={item?.lon ?? ""}
            />

            <CheckboxInput
              className="sm:col-span-4"
              {...register("privacyAccettata")}
              aria="Inserisci novita"
              label="Privacy"
              defaultChecked={item?.privacyAccettata || false}
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
EditUsers.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};
export default EditUsers;
