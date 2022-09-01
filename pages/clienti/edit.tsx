import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useState } from "react";
import { Customer, ICustomer } from "../../models/Customer";
import EditPage from "../../components/features/EditPage/EditPage";
import FormInput from "../../components/FormInput";
import CheckboxInput from "../../components/core/Checkbox";
import { mpApi } from "../../lib/mpApi";
import FormPasswordInput from "../../components/Password";
import { useRouter } from "next/router";
import Button from "../../components/core/Button";
import Dialog from "../../components/shared/Dialog/Dialog";
import Overlay from "../../components/shared/Overlay";
import { UseFormSetValue } from "react-hook-form";
import AutocompleteAdvanced from "../../components/shared/AutocompleteAdvanced/AutocompleteAdvanced";
import { SlugName } from "../../models/types/SlugName";

const defaultValues: Customer = {
  id: 0,
  codiceFiscale: "",
  nome: "",
  cognome: "",
  email: "",
  numeroDiTelefono: "",
  indirizzo: "",
  latitudine: 0,
  longitudine: 0,
  privacyAccettata: false,
  ruolo: "3",
};

const EditClienti: NextPageWithLayout = () => {
  const [type, setType] = useState<"Cliente" | "Collaboratore" | string>("");

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const [openConfirmResetPassword, setOpenConfirmResetPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [serviziAttivi, setServiziAttivi] = useState([]);
  const [pacchettiAttivi, setPacchettiAttivi] = useState([]);

  const [itemFromApi, setItemFromApi] = useState<ICustomer>({});
  const [setValueForm, setValueFormState] = useState<UseFormSetValue<Customer>>(() => {});

  const { pathname, query } = useRouter();

  const handleSetValueFormChange = (setValue: UseFormSetValue<Customer>) => {
    if (setValueFormState !== setValue) {
      setValueFormState(() => setValue);
    }
  };

  const handleFormItemChange = (item: ICustomer) => {
    setItemFromApi(item);
  };

  const handleMatchPassword = (value: string, pass: string) => {
    if (value == password) {
      return true;
    } else {
      setErrorPassword(true);
      return false;
    }
  };

  const handleResetPassword = async () => {
    const id = query.id;
    if (id) {
      setIsLoading(true);
      setOpenConfirmResetPassword(false);
      mpApi.customers.actions
        .resetPassword(Number(id))
        .then((res: any) => {
          setMessage(res.message);
          setIsLoading(false);
        })
        .catch((err: any) => {
          setMessage(err.message);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (pathname.includes("clienti")) {
      setType("Cliente");
    } else if (pathname.includes("collaboratori")) {
      setType("Collaboratore");
    }

    setPassword("");
    setErrorPassword(false);
  }, [pathname]);

  useEffect(() => {
    if (query.id) {
      mpApi.customers.actions
        .serviziAttivi(Number(query.id))
        .then((resp: any) => setServiziAttivi(resp.content))
        .catch((err) => console.log(err));

      mpApi.customers.actions
        .pacchettiAttivi(Number(query.id))
        .then((resp: any) => setPacchettiAttivi(resp.content))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <EditPage<Customer>
      defaultValues={defaultValues}
      mpApiAction={mpApi.customers}
      slugName={
        type
          .toLowerCase()
          .substring(0, type.length - 1)
          .concat("i") as SlugName
      }
      setValueForm={handleSetValueFormChange}
      onItemFromApi={handleFormItemChange}
    >
      {(item: Customer, register, renderError, errors) => {
        return item ? (
          <div>
            <div>
              <h3 className="text-4xl font-bold leading-6 text-gray-900">
                {item.id === 0 ? (
                  `Nuovo ${type}`
                ) : (
                  <div className="flex items-center gap-2">
                    <span className=""> {type}: </span>
                    <span className="text-4xl font-semibold tracking-wide text-gray-900">{item.nome + " " + item.cognome}</span>
                  </div>
                )}
              </h3>
              <div className="mt-1 text-sm text-gray-500"></div>
            </div>
            {type !== "Collaboratore" && item.id !== 0 && (
              <div className="mt-7 flex justify-between gap-8">
                <div className="max-h-[500px] w-1/2 flex-col justify-center overflow-y-auto rounded-xl bg-white p-10">
                  <p className="text-bold text-left text-xl font-bold">Servizi attivi</p>
                  <div className="mt-5 flex max-h-[290px] flex-col gap-4 overflow-y-auto">
                    {serviziAttivi.map((s: any) => {
                      return (
                        <div key={s.id} className="flex items-center justify-between rounded-md bg-gray-50 p-4">
                          <p>{s.id}</p>
                          <p className="font-bold">{s.nome}</p>
                          <p>{s.costo}€</p>
                        </div>
                      );
                    })}
                    {serviziAttivi.length === 0 && <p className="text-center">Nessun servizio attivo.</p>}
                  </div>
                </div>
                <div className="max-h-[500px] w-1/2 flex-col justify-center overflow-y-auto rounded-xl bg-white p-10">
                  <p className="text-bold text-left text-xl font-bold">Pacchetti attivi</p>
                  <div className="mt-5 flex max-h-[290px] flex-col gap-4 overflow-y-auto">
                    {pacchettiAttivi.map((p: any) => {
                      return (
                        <div key={p.id} className="flex items-center justify-between rounded-md bg-gray-50 p-4">
                          <p>{p.id}</p>
                          <p className="font-bold">{p.nome}</p>
                          <p>{p.costo}€</p>
                        </div>
                      );
                    })}
                    {pacchettiAttivi.length === 0 && <p className="text-center">Nessun pacchetto attivo.</p>}
                  </div>
                </div>
              </div>
            )}
            {type !== "Collaboratore" && item.id !== 0 && <div className="mt-10 h-[1px] w-full bg-gray-200" />}
            <div className="mt-10 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
                {...register("codiceFiscale", { required: true })}
                errorMessage={renderError(errors["codiceFiscale"])}
                autoComplete="codiceFiscale"
                aria="Modifica il Codice Fiscale"
                label="Codice Fiscale"
                defaultValue={item?.codiceFiscale ?? ""}
              />
              {item.id === 0 && (
                <>
                  <FormPasswordInput
                    className="sm:col-span-3"
                    {...register("password", { required: true, validate: (value) => handleMatchPassword(value, passwordRepeat) })}
                    errorMessage={renderError(errors["password"])}
                    autoComplete="password"
                    aria="Inserisci la password"
                    label="Password"
                    defaultValue={""}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="relative sm:col-span-3">
                    <FormPasswordInput
                      className="border-none"
                      {...register("password_repeat", { required: true, validate: (value) => handleMatchPassword(value, password) })}
                      errorMessage={renderError(errors["password_repeat"]) || errorPassword ? "Le password non coincidono." : undefined}
                      autoComplete="password"
                      aria="conferma password"
                      label="Conferma Password"
                      defaultValue={""}
                      type="password"
                      onChange={(e) => {
                        setPasswordRepeat(e.target.value);
                        setErrorPassword(false);
                      }}
                    />
                    {/* {errorPassword && <p className="mt-2 text-sm text-red-600"></p>} */}
                  </div>
                </>
              )}
              <FormInput
                className="sm:col-span-3"
                {...register("numeroDiTelefono", { required: true })}
                errorMessage={renderError(errors["tel"])}
                autoComplete="tel"
                aria="Modifica il numero di telefono"
                label="Telefono"
                defaultValue={item?.numeroDiTelefono ?? ""}
                type="tel"
              />

              <div className="flex h-full flex-col items-start justify-evenly sm:col-span-3">
                <AutocompleteAdvanced<Customer> setValue={setValueForm} customer={null} saveAddress />
              </div>

              {item.id !== 0 && (
                <CheckboxInput
                  className="sm:col-span-4"
                  {...register("privacyAccettata")}
                  aria="Inserisci novita"
                  label="Privacy"
                  aria-checked={item?.privacyAccettata}
                />
              )}
            </div>

            {item.id !== 0 && (
              <div className="mt-4 flex w-full justify-end">
                <Button
                  aria=""
                  title="Reset Password"
                  className="w-fit rounded-md px-4 py-3"
                  onClick={() => setOpenConfirmResetPassword(true)}
                />
              </div>
            )}

            <Dialog isOpen={Boolean(message)} onClose={() => setMessage("")} title="">
              <div className="">{message}</div>
            </Dialog>

            <Dialog
              isOpen={openConfirmResetPassword}
              onClose={() => setOpenConfirmResetPassword(false)}
              title="Conferma il rispristino della password?"
            >
              <div className="mt-4 flex gap-4">
                <Button title="Annulla" aria="" onClick={() => setOpenConfirmResetPassword(false)} />
                <Button title="Conferma" aria="" onClick={() => handleResetPassword()} />
              </div>
            </Dialog>

            <Overlay loading={isLoading} text="" />
          </div>
        ) : (
          <></>
        );
      }}
    </EditPage>
  );
};
EditClienti.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Clienti">{page}</SidebarLayout>;
};
export default EditClienti;
