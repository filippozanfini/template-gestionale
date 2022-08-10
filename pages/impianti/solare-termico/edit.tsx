import SidebarLayout from "../../../layouts/SidebarLayout";
import { ReactElement } from "react";
import { mpApi } from "../../../lib/mpApi";
import FormInput from "../../../components/FormInput";
import FourOFour from "../../../components/FourOFour";
import { NextPageWithLayout } from "../../_app";
import EditPageImpianti from "../../../components/features/EditPageImpianti/EditPageImpianti";

type ImpiantoSolareTermico = {
  id: number;
  idUtente: number;
  marca: string;
  dataInstallazione: string;
  dirittoFisso: string;
  tipoENumeroCollettori: string;
  tipoELitriBollitore: string;
  longitudine: number | undefined;
  latitudine: number | undefined;
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
  longitudine: undefined,
  latitudine: undefined,
  tipologiaCircolazione: "",
};

const EditImpiantiSolareTermico: NextPageWithLayout = () => {
  return (
    <EditPageImpianti<ImpiantoSolareTermico>
      defaultValues={defaultValues}
      mpApi={mpApi.installations}
      mpApiAction={mpApi.installations.actions.saveSolarThermal}
      slugNameImpianti="solare-termico"
    >
      {(item: ImpiantoSolareTermico, errors, register, renderError) => {
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
              defaultValue={item?.latitudine}
            />

            <FormInput
              className="sm:col-span-3"
              {...register("tipologiaCircolazione", { required: true })}
              errorMessage={renderError(errors["tipologiaCircolazione"])}
              autoComplete="tipologiaCircolazione"
              aria="Inserisci la Tipologia Circolazione"
              label="Tipologia Circolazione"
              defaultValue={item?.tipologiaCircolazione}
              type="text"
            />
          </>
        ) : (
          <FourOFour title="Risorsa non trovata" description="Il contenuto che hai richiesto è stato rimosso oppure non esiste." />
        );
      }}
    </EditPageImpianti>
  );
};

EditImpiantiSolareTermico.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti - solare termico">{page}</SidebarLayout>;
};

export default EditImpiantiSolareTermico;
