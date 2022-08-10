import SidebarLayout from "../../../layouts/SidebarLayout";
import { ReactElement, useEffect, useState } from "react";
import { mpApi } from "../../../lib/mpApi";
import { UseFormSetValue } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import FourOFour from "../../../components/FourOFour";
import { NextPageWithLayout } from "../../_app";
import ComboBox, { ComboBoxElement } from "../../../components/ComboBox";
import EditPageImpianti from "../../../components/features/EditPageImpianti/EditPageImpianti";

type ImpiantoFotovoltaico = {
  id: number;
  idUtente: number;
  potenza: string;
  tensione: string;
  moduloFV: string;
  numeroModuli: number;
  inverter: string;
  dataInstallazione: string;
  dirittoFisso: string;
  longitudine: string | undefined;
  latitudine: string | undefined;
};

const defaultValues: ImpiantoFotovoltaico = {
  id: 0,
  idUtente: 0,
  potenza: "",
  tensione: "",
  moduloFV: "",
  numeroModuli: 0,
  inverter: "",
  dataInstallazione: "",
  dirittoFisso: "0",
  longitudine: undefined,
  latitudine: undefined,
};

const tensionValues: ComboBoxElement[] = [
  { label: "media", value: "media" },
  { label: "bassa", value: "bassa" },
];

const EditImpiantiFotovoltaici: NextPageWithLayout = () => {
  const [tensionValueSelected, setTensionValueSelected] = useState<string>(String(tensionValues[0].value));
  const [setValueForm, setValueFormState] = useState<UseFormSetValue<ImpiantoFotovoltaico>>(() => {});
  const [formItems, setFormItems] = useState<ImpiantoFotovoltaico>();

  const handleSetValueFormChange = (setValue: UseFormSetValue<ImpiantoFotovoltaico>) => {
    if (setValueFormState !== setValue) {
      setValueFormState(() => setValue);
    }
  };

  const handleFormItemChange = (item: ImpiantoFotovoltaico) => {
    setFormItems(item);
  };

  useEffect(() => {
    if (setValueForm) {
      console.log("tensionValueSelected", tensionValueSelected);
      setValueForm("tensione", tensionValueSelected);
    }
  }, [tensionValueSelected, setValueForm]);

  useEffect(() => {
    if (formItems && formItems?.tensione) {
      setTensionValueSelected(formItems.tensione);
    } else {
      setTensionValueSelected(String(tensionValues[0].value));
    }
  }, [formItems]);

  return (
    <EditPageImpianti<ImpiantoFotovoltaico>
      defaultValues={defaultValues}
      mpApi={mpApi.installations}
      mpApiAction={mpApi.installations.actions.savePhotovoltaic}
      slugNameImpianti={"fotovoltaico"}
      setValueForm={handleSetValueFormChange}
      onItemFromApi={handleFormItemChange}
    >
      {(item: ImpiantoFotovoltaico, errors, register, renderError) => {
        return item ? (
          <>
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

            <ComboBox
              className="sm:col-span-3"
              aria="Inserisci la Tensione"
              label="Tensione"
              value={tensionValueSelected}
              elements={tensionValues}
              name="Tensione"
              onChange={(e: any) => {
                setTensionValueSelected(e.target.value);
              }}
            />
            <FormInput
              className="sm:col-span-3"
              {...register("moduloFV", { required: true })}
              errorMessage={renderError(errors["moduloFV"])}
              autoComplete="moduloFV"
              aria="Inserisci il Modulo Fv"
              label="Modulo Fv"
              defaultValue={item?.moduloFV ?? ""}
            />
            <FormInput
              className="sm:col-span-3"
              {...register("numeroModuli", { required: true })}
              errorMessage={renderError(errors["numeroModuli"])}
              autoComplete="numeroModuli"
              aria="Inserisci il Numero dei Moduli"
              label="Numero Moduli"
              defaultValue={item?.numeroModuli ?? ""}
              type="number"
            />
            <FormInput
              className="sm:col-span-3"
              {...register("inverter", { required: true })}
              errorMessage={renderError(errors["inverter"])}
              autoComplete="inverter"
              aria="Inserisci Inverter"
              label="Inverter"
              defaultValue={item?.inverter ?? ""}
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

EditImpiantiFotovoltaici.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti - fotovoltaico">{page}</SidebarLayout>;
};

export default EditImpiantiFotovoltaici;
