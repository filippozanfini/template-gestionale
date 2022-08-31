import { CheckIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { DeepRequired, FieldErrorsImpl, Path, SubmitHandler, useForm, UseFormRegister, UseFormSetValue } from "react-hook-form";
import renderError from "../../../lib/errorMessages";
import { Customer } from "../../../models/Customer";
import { SlugNameImpianti } from "../../../models/types/SlugName";
import CheckboxInput from "../../core/Checkbox";
import FormInput from "../../FormInput";
import { useAlert } from "../../notifications";
import Combobox from "../../shared/ComboBox/Combobox";
import { mpApi as api } from "../../../lib/mpApi";
import Loader from "../../core/Loader";
import Overlay from "../../shared/Overlay";
import AutocompleteInput from "../../core/AutocompleteInput";
import AutocompletePlaces from "../../shared/AutocompletePlaces/AutocompletePlaces";
import { LatLng } from "react-google-places-autocomplete/build/GooglePlacesAutocomplete.types";

interface EditPageImpiantiProps<T> {
  defaultValues: T;
  slugNameImpianti: SlugNameImpianti;
  mpApi: any;
  mpApiAction: any;
  children: (
    items: any,
    errors: FieldErrorsImpl<DeepRequired<any>>,
    register: UseFormRegister<any>,
    renderError: (errorData: any) => string | undefined
  ) => JSX.Element | React.ReactNode;
  onItemFromApi?: (item: T) => void;
  setValueForm?: (setValue: UseFormSetValue<T>) => void;
}

/**
 *
 * @param mpApi es. api.installations
 * @param mpApiAction es. api.installations.actions.save
 */
const EditPageImpianti = function <T>({
  children,
  setValueForm,
  onItemFromApi,
  defaultValues,
  mpApi,
  mpApiAction,
  slugNameImpianti,
}: EditPageImpiantiProps<T>) {
  const { push, query } = useRouter();
  const [item, setItem] = useState<T | any>(defaultValues);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [listCustomers, setListCustomers] = useState<Customer[]>([]);

  const [date, setDate] = useState<string>("");
  const [autoComputation, setAutoComputation] = useState(true);

  const [latLng, setLanLng] = useState<LatLng | null>(null);
  const [address, setAddress] = useState<string>("");
  const [defaultCoords, setDefaultCoords] = useState<boolean>(false);

  /* FILTER */
  const [filter, setFilter] = useState<string>("");

  /* UTILS */
  const [loading, setLoading] = useState<boolean>(false);
  const [copyAddressClipBoardActive, setCopyAddressClipBoardActive] = useState<boolean>(false);

  const alert = useAlert();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<T>();

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      reset(defaultValues);
      return null;
    } else {
      return mpApi.actions
        .item(String(ItemId))
        .then((data: any) => {
          console.log("data", data);
          setItem(data);
          setCustomer(new Customer(data.utente));
          setDate(data.dataInstallazione.split("/").reverse().join("-"));
          setLanLng({ lat: data.latitudine, lng: data.longitudine });

          reset(data);
        })
        .catch((data: any) => {
          setItem(null);
          setCustomer(null);
          setDate("");
          setLanLng(null);
          reset(defaultValues);
        });
    }
  };

  const onSubmit: SubmitHandler<T> = async (formdata: T | any, e: any) => {
    e.preventDefault();

    const newFormData: any = {
      ...formdata,
      dataInstallazione: formdata.dataInstallazione.split("-").reverse().join("/"),
      idUtente: customer?.id || 0,
      dirittoFisso: autoComputation ? -1 : formdata.dirittoFisso,
    };

    if (newFormData.id === 0) {
      delete newFormData.id;
    }

    Object.keys(newFormData).forEach((key) => {
      if (newFormData[key] === "") {
        delete newFormData[key];
      }
    });
    setLoading(true);
    mpApiAction(newFormData)
      .then((response: any) => {
        alert({
          id: new Date().toISOString(),
          type: "success",
          title: "Salvataggio Risorsa",
          message: response.message,
          read: false,
          isAlert: true,
        });
        setLoading(false);
        const tempItem = item as any;
        push(`/impianti/${slugNameImpianti}/edit/?id=` + (response.id | response.data?.id | tempItem.id | 0));
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

        setLoading(false);
        if (reason && reason.data && reason.data.errors) {
          Object.keys(reason?.data?.errors).forEach((field: any) => {
            setError(field as Path<T>, {
              type: "custom",
              message: reason.data.errors[field],
            });
          });
        }
      });
  };

  const onChangeLatLng = (latLng: LatLng) => {
    setLanLng(latLng);
  };

  const onChangeAddress = (address: string) => {
    setAddress(address);
  };

  const onCopyAddressToClipBoard = () => {
    setCopyAddressClipBoardActive(true);

    if (defaultCoords) {
      navigator.clipboard.writeText(customer?.indirizzo || "");
    } else {
      navigator.clipboard.writeText(address);
    }

    setTimeout(() => {
      setCopyAddressClipBoardActive(false);
    }, 4000);
  };

  useEffect(() => {
    if (query.id) {
      const ItemId: number = Number(query.id);
      loadItem(ItemId);
    } else {
      reset(defaultValues);
      setItem(defaultValues);
    }
  }, [query]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res: any = await api.customers.actions.autocomplete(1, 25, filter);

      const resCustomer = res.content;

      setListCustomers(resCustomer);
      setLoading(false);
    };

    if (filter) {
      const timeout = setTimeout(() => fetchData(), 400);

      return () => clearTimeout(timeout);
    } else {
      setListCustomers([]);
      setCustomer(null);
    }
  }, [filter]);

  useEffect(() => {
    setValue("dataInstallazione" as Path<T>, date as any);
    if (onItemFromApi && item) {
      onItemFromApi(item);
    }
  }, [date, item]);

  useEffect(() => {
    if (customer && defaultCoords) {
      setValue("latitudine" as Path<T>, customer.latitudine as any);
      setValue("longitudine" as Path<T>, customer.longitudine as any);
    }
  }, [customer, defaultCoords]);

  useEffect(() => {
    if (customer && item) {
      const value = matchCoords({ lat: item.latitudine, lng: item.longitudine }, customer);
      setDefaultCoords(value);
    }
  }, [customer, item]);

  useEffect(() => {
    if (latLng?.lat && latLng?.lng) {
      setValue("latitudine" as Path<T>, latLng.lat as any);
      setValue("longitudine" as Path<T>, latLng.lng as any);
    }
  }, [latLng]);

  useEffect(() => {
    if (setValueForm) {
      setValueForm(setValue);
    }
  }, [setValue]);

  return (
    <>
      <form className="space-y-8 divide-y divide-gray-200" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-4xl font-bold leading-6 text-gray-900">{item?.id > 0 ? "CODICE: " + item.id : "Nuovo impianto"}</h3>
              <div className="mt-1 text-sm text-gray-500"></div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {item.id > 0 ? <input type="hidden" value={item?.id} {...register("id" as Path<T>)} /> : null}
              <div className="col-span-6 flex flex-col items-start">
                {item.id == 0 ? (
                  <>
                    <span className="block text-sm font-medium text-gray-700">Cerca Utente</span>
                    <Combobox
                      listItems={listCustomers}
                      onFilterChange={(filters) => setFilter(filters)}
                      onSelectedChange={(value) => setCustomer(value)}
                      selectedName={customer ? customer?.nome + " " + customer?.cognome + ", " + customer?.indirizzo : filter}
                      loading={loading}
                      selected={customer}
                    >
                      {(item: Customer, selected, active) => (
                        <div className="flex items-center gap-4">
                          <span className={`block w-1/4 truncate ${selected ? "font-medium" : "font-normal"}`}>
                            {item.nome + " " + item.cognome}
                          </span>
                          <span className="w-1/3">{item.indirizzo}</span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary-600"}`}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                      )}
                    </Combobox>
                  </>
                ) : (
                  <FormInput
                    label="Utente"
                    type="text"
                    value={customer ? customer?.nome + " " + customer?.cognome + ", " + customer?.indirizzo : ""}
                    disabled={true}
                    aria="utente"
                    name="Utente"
                  />
                )}
              </div>

              {customer?.id && <input type="hidden" value={customer?.id} {...register("idUtente" as Path<T>)} />}

              <FormInput
                className="sm:col-span-3"
                {...register("dataInstallazione" as Path<T>, { required: true })}
                errorMessage={renderError(errors["dataInstallazione" as Path<T>])}
                autoComplete="dataInstallazione"
                aria="Inserisci la Data di Installazione"
                label="Data di Installazione"
                value={date ?? ""}
                onChange={(e: any) => {
                  setDate(e.target.value);
                }}
                type="date"
              />

              {children(item, errors, register, renderError)}

              {/* <div className="flex gap-4 sm:col-span-6">
                <FormInput
                  className="sm:col-span-2"
                  {...register("latitudine" as Path<T>)}
                  errorMessage={renderError(errors["latitudine" as Path<T>])}
                  autoComplete="latitudine"
                  aria="Inserisci la Latitudine"
                  label="Latitudine"
                  defaultValue={item.id === 0 && defaultCoords ? customer?.latitudine : item?.latitudine}
                  disabled={defaultCoords}
                />
                <FormInput
                  className="sm:col-span-2"
                  {...register("longitudine" as Path<T>)}
                  errorMessage={renderError(errors["longitudine" as Path<T>])}
                  autoComplete="longitudine"
                  aria="Inserisci la Longitudine"
                  label="Longitudine"
                  defaultValue={item.id === 0 && defaultCoords ? customer?.longitudine : item?.longitudine}
                  disabled={defaultCoords}
                />
                <CheckboxInput
                  aria="Coordinate dell'utente"
                  label="Usa coordinate utente"
                  name="calcolo-automatico"
                  defaultChecked={defaultCoords}
                  onChange={(e) => setDefaultCoords(e.target.checked)}
                  className="mt-5 flex items-center whitespace-nowrap"
                />
              </div> */}

              <div className="flex w-full gap-4 sm:col-span-6">
                <div className="w-full">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Indirizzo</span>
                  <div className="flex w-full items-center gap-2">
                    {defaultCoords ? (
                      <input
                        type={"text"}
                        className="my-auto h-[38px] w-full rounded-md border border-gray-300"
                        value={customer?.indirizzo}
                        disabled
                      />
                    ) : (
                      <AutocompleteInput
                        latLng={latLng ? latLng : undefined}
                        onChangeLatLng={(value) => onChangeLatLng(value)}
                        onChangeAddress={(value) => onChangeAddress(value)}
                        disabled={defaultCoords}
                      />
                    )}

                    <button
                      type="button"
                      className="h-7 w-7 transition-all duration-100 "
                      title="copia indirizzo"
                      onClick={() => onCopyAddressToClipBoard()}
                      disabled={copyAddressClipBoardActive}
                    >
                      {!copyAddressClipBoardActive ? (
                        <ClipboardCopyIcon className="text-gray-500 hover:opacity-70 active:scale-95" />
                      ) : (
                        <CheckIcon className="text-green-700" />
                      )}
                    </button>
                  </div>
                </div>

                <CheckboxInput
                  aria="Coordinate dell'utente"
                  label="Usa coordinate utente"
                  name="calcolo-automatico"
                  checked={defaultCoords}
                  onChange={(e) => setDefaultCoords(e.target.checked)}
                  className="mt-5 flex items-center whitespace-nowrap"
                />
              </div>

              <div className="flex gap-4 sm:col-span-3">
                <FormInput
                  className="w-full"
                  {...register("dirittoFisso" as Path<T>, { required: true })}
                  errorMessage={renderError(errors["dirittoFisso" as Path<T>])}
                  autoComplete="dirittoFisso"
                  aria="Inserisci il Diritto Fisso di Chiamata"
                  label="Diritto Fisso di Chiamata (€)"
                  defaultValue={item?.dirittoFisso ?? ""}
                  type="number"
                  disabled={autoComputation}
                />
                <CheckboxInput
                  aria="Calcolo automatico"
                  label="Calcolo automatico"
                  name="calcolo-automatico"
                  defaultChecked={autoComputation}
                  onChange={(e) => setAutoComputation(e.target.checked)}
                  className="mt-5 flex items-center whitespace-nowrap"
                />
              </div>
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
              Svuota campi
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

      <Overlay loading={loading} />
    </>
  );
};

const matchCoords = (latLng: any, customer: Customer) => {
  console.log("latLng", latLng);
  console.log("customer", customer);

  if (latLng && customer) {
    return latLng.lat === customer.latitudine && latLng.lng === customer.longitudine;
  }
  return false;
};

export default EditPageImpianti;
