import SidebarLayout from "../../layouts/SidebarLayout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useState } from "react";
import { Customer } from "../../models/Customer";
import EditPage from "../../components/features/EditPage/EditPage";
import FormInput from "../../components/FormInput";
import CheckboxInput from "../../components/core/Checkbox";
import { mpApi } from "../../lib/mpApi";
import FormPasswordInput from "../../components/Password";
import { useRouter } from "next/router";

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
  const { pathname } = useRouter();

  const handleMatchPassword = (value: string, pass: string) => {
    if (value === password) {
      return true;
    } else {
      setErrorPassword(true);
      return false;
    }
  };

  useEffect(() => {
    const path = pathname.split("/");

    if (path.includes("clienti")) {
      setType("Cliente");
    } else if (path.includes("collaboratori")) {
      setType("Collaboratore");
    }

    setPassword("");
    setErrorPassword(false);
  }, [pathname]);

  return (
    <EditPage<Customer> defaultValues={defaultValues} mpApiAction={mpApi.customers} slugName="clienti">
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
                {...register("latitudine", { required: true })}
                errorMessage={renderError(errors["lat"])}
                autoComplete="lat"
                aria="Modifica la latitudine"
                label="Latitudine"
                defaultValue={item?.latitudine ?? ""}
              />
              <FormInput
                className="sm:col-span-3"
                {...register("longitudine", { required: true })}
                errorMessage={renderError(errors["lon"])}
                autoComplete="lon"
                aria="Modifica la longitudine"
                label="Longitudine"
                defaultValue={item?.longitudine ?? ""}
              />

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
