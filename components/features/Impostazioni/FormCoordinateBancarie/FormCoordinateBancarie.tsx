import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Path, SubmitHandler, useForm } from "react-hook-form";
import renderError from "../../../../lib/errorMessages";
import { mpApi } from "../../../../lib/mpApi";
import FormInput from "../../../FormInput";
import Overlay from "../../../shared/Overlay";
import { useAlert } from "../../../notifications";

interface CoordinateBancarie {
  iban: string;
  intestatario: string;
  causale: string;
}

const FormCoordinateBancarie = () => {
  const [coordinateBancarie, setCoordinateBancarie] = useState<CoordinateBancarie>();
  const [isLoading, setIsLoading] = useState(true);

  const { push } = useRouter();

  const alert = useAlert();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<CoordinateBancarie>();

  const loadItem = async () => {
    setIsLoading(true);
    return mpApi.settings.actions
      .coordinates()
      .then((data: any) => {
        setCoordinateBancarie(data);
        reset(data);
        setIsLoading(false);
      })
      .catch((data: any) => {
        reset(coordinateBancarie);
        alert({
          id: new Date().toISOString(),
          type: "error",
          title: "Richiesta Dati",
          message: "Errore nel caricamento della risorsa",
          read: false,
          isAlert: true,
        });
        setIsLoading(false);
      });
  };

  const onSubmit: SubmitHandler<CoordinateBancarie> = async (formdata: CoordinateBancarie, e: any) => {
    e.preventDefault();

    setIsLoading(true);
    mpApi.settings.actions
      .saveCoordinates(formdata)
      .then((data: any) => {
        alert({
          id: new Date().toISOString(),
          type: "success",
          title: "Salvataggio Risorsa",
          message: "Dati Bancari aggiornati con successo",
          read: false,
          isAlert: true,
        });
        console.log(data);
        setIsLoading(false);

        // push(`/`);
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

        setIsLoading(false);
        if (reason && reason.data && reason.data.errors) {
          Object.keys(reason?.data?.errors).forEach((field: any) => {
            setError(field as Path<CoordinateBancarie>, {
              type: "custom",
              message: reason.data.errors[field],
            });
          });
        }
      });
  };

  useEffect(() => {
    loadItem();
  }, []);

  return (
    <>
      <form
        className="flex flex-col gap-10"
        onSubmit={(e) => {
          handleSubmit(onSubmit)(e);
          clearErrors();
        }}
      >
        <div className="">
          <FormInput
            {...register("iban", { required: true })}
            errorMessage={renderError(errors["iban"])}
            autoComplete="iban"
            label="IBAN"
            type="text"
            aria="iban"
            name="iban"
          />
          <FormInput
            {...register("intestatario", { required: true })}
            errorMessage={renderError(errors["intestatario"])}
            autoComplete="intestatario"
            label="Intestatario"
            type="text"
            aria="intestatario"
            name="intestatario"
          />
          <FormInput
            {...register("causale", { required: true })}
            errorMessage={renderError(errors["causale"])}
            autoComplete="causale"
            label="Causale"
            type="text"
            aria="causale"
            name="causale"
          />
        </div>
        <div className="space-x-4 text-right">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => {
              reset(coordinateBancarie);
            }}
          >
            Annulla
          </button>

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Salva
          </button>
        </div>
      </form>
      <Overlay loading={isLoading} text="Caricamento..." />
    </>
  );
};

export default FormCoordinateBancarie;
