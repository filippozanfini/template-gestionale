import SidebarLayout from "../../../layouts/SidebarLayout";
import { ReactElement } from "react";
import { mpApi } from "../../../lib/mpApi";
import FormInput from "../../../components/FormInput";
import FourOFour from "../../../components/FourOFour";
import { NextPageWithLayout } from "../../_app";
import EditPageImpianti from "../../../components/features/EditPageImpianti/EditPageImpianti";

type ImpiantoPompaDiCalore = {
  id: number;
  idUtente: number;
  marca: string;
  modello: string;
  potenza: string;
  dataInstallazione: string;
  dirittoFisso: string;
  longitudine: number | undefined;
  latitudine: number | undefined;
};

const defaultValues: ImpiantoPompaDiCalore = {
  id: 0,
  idUtente: 0,
  marca: "",
  modello: "",
  potenza: "",
  dataInstallazione: "",
  dirittoFisso: "0",
  longitudine: undefined,
  latitudine: undefined,
};

const EditImpiantiPompaDiCalore: NextPageWithLayout = () => {
  return (
    <EditPageImpianti<ImpiantoPompaDiCalore>
      defaultValues={defaultValues}
      mpApi={mpApi.installations}
      mpApiAction={mpApi.installations.actions.savePump}
      slugNameImpianti="pompa-di-calore"
    >
      {(item: ImpiantoPompaDiCalore, errors, register, renderError) => {
        return item ? (
          <>
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
              {...register("potenza", { required: true })}
              errorMessage={renderError(errors["potenza"])}
              autoComplete="potenza"
              aria="Inserisci la Potenza"
              label="Potenza"
              type="number"
              defaultValue={item?.potenza ?? ""}
            />
            <FormInput
              className="sm:col-span-3"
              {...register("longitudine")}
              errorMessage={renderError(errors["longitudine"])}
              autoComplete="longitudine"
              aria="Inserisci la Longitudine"
              label="Longitudine"
              defaultValue={item?.longitudine}
            />
            <FormInput
              className="sm:col-span-3"
              {...register("latitudine")}
              errorMessage={renderError(errors["latitudine"])}
              autoComplete="latitudine"
              aria="Inserisci la Latitudine"
              label="Latitudine"
              defaultValue={item?.latitudine}
            />
          </>
        ) : (
          <FourOFour title="Risorsa non trovata" description="Il contenuto che hai richiesto è stato rimosso oppure non esiste." />
        );
      }}
    </EditPageImpianti>
  );
};

EditImpiantiPompaDiCalore.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti - pompa di calore">{page}</SidebarLayout>;
};

export default EditImpiantiPompaDiCalore;
