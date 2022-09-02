import SidebarLayout from "../../../layouts/SidebarLayout";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { mpApi } from "../../../lib/mpApi";
import { UseFormSetValue } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import FourOFour from "../../../components/FourOFour";
import { NextPageWithLayout } from "../../_app";
import ComboBox, { ComboBoxElement } from "../../../components/ComboBox";
import EditPageImpianti from "../../../components/features/EditPageImpianti/EditPageImpianti";

type ImpiantoCaldaia = {
  id: number;
  idUtente: number;
  marca: string;
  modello: string;
  alimentazione: number | string;
  dataInstallazione: string;
  dirittoFisso: number | string;
  longitudine: number | undefined;
  latitudine: number | undefined;
};

const defaultValues: ImpiantoCaldaia = {
  id: 0,
  idUtente: 0,
  marca: "",
  modello: "",
  alimentazione: "",
  dataInstallazione: "",
  dirittoFisso: 0,
  longitudine: undefined,
  latitudine: undefined,
};

const powerType: ComboBoxElement[] = [
  { label: "Metano", value: 0 },
  { label: "Gas", value: 1 },
];

const EditImpiantiCaldaia: NextPageWithLayout = () => {
  const { pathname } = useRouter();
  const [type, setType] = useState<"caldaia" | "condizionatore" | string>("");
  const [apiAction, setApiAction] = useState<any>("");

  const [setValueForm, setValueFormState] = useState<UseFormSetValue<ImpiantoCaldaia>>(() => {});
  const [formItems, setFormItems] = useState<ImpiantoCaldaia>();
  const [powerTypeSelected, setPowerTypeSelected] = useState(powerType[0].value);

  const handleSetValueFormChange = (setValue: UseFormSetValue<ImpiantoCaldaia>) => {
    if (setValueFormState !== setValue) {
      setValueFormState(() => setValue);
    }
  };

  const handleFormItemChange = (item: ImpiantoCaldaia) => {
    setFormItems(item);
  };

  useEffect(() => {
    if (setValueForm && type === "caldaia") {
      setValueForm("alimentazione", Number(powerTypeSelected));
    }
  }, [powerTypeSelected, setValueForm]);

  useEffect(() => {
    if (formItems && formItems.alimentazione) {
      setPowerTypeSelected(formItems.alimentazione);
    } else {
      setPowerTypeSelected(powerType[0].value);
    }
  }, [formItems]);

  useEffect(() => {
    if (pathname) {
      const path = pathname.split("/");
      if (path.indexOf("caldaia") > -1) {
        setType("caldaia");
        setApiAction(() => mpApi.installations.actions.saveBoiler);
      } else if (path.indexOf("condizionatore") > -1) {
        setType("condizionatore");
        setApiAction(() => mpApi.installations.actions.saveAirConditioning);
      }
    }
  }, [pathname]);

  return type ? (
    <EditPageImpianti<ImpiantoCaldaia>
      defaultValues={defaultValues}
      mpApi={mpApi.installations}
      mpApiAction={apiAction}
      slugNameImpianti={type as "caldaia" | "condizionatore"}
      setValueForm={handleSetValueFormChange}
      onItemFromApi={handleFormItemChange}
    >
      {(item: ImpiantoCaldaia, errors, register, renderError) => {
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

            {type === "caldaia" ? (
              <ComboBox
                className="sm:col-span-3"
                aria="Seleziona Alimentazione"
                label="Alimentazione"
                value={powerTypeSelected}
                elements={powerType}
                name="Alimentazione"
                onChange={(e: any) => {
                  setPowerTypeSelected(e.target.value);
                }}
              />
            ) : (
              <FormInput
                className="sm:col-span-3"
                {...register("alimentazione", { required: true })}
                errorMessage={renderError(errors["alimentazione"])}
                autoComplete="alimentazione"
                aria="Inserisci il tipo di alimentazione"
                label="Tipo di alimentazione"
                defaultValue={item?.alimentazione ?? ""}
                type="text"
              />
            )}
          </>
        ) : (
          <FourOFour title="Risorsa non trovata" description="Il contenuto che hai richiesto è stato rimosso oppure non esiste." />
        );
      }}
    </EditPageImpianti>
  ) : null;
};

EditImpiantiCaldaia.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Impianti - Caldaia">{page}</SidebarLayout>;
};

export default EditImpiantiCaldaia;
