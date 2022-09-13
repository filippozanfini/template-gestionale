import { RadioGroup, Tab } from "@headlessui/react";
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { Path, SubmitHandler, useForm } from "react-hook-form";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi } from "../../lib/mpApi";
import { useRouter } from "next/router";
import { Customer } from "../../models/Customer";
import Combobox from "../../components/shared/ComboBox/Combobox";
import { CheckIcon, CashIcon, LibraryIcon } from "@heroicons/react/solid";
import { Quote } from "../../models/Quote";
import Overlay from "../../components/shared/Overlay";
import TableQuotes from "../../components/features/TableQuotes";
import { useAlert } from "../../components/notifications";
import TableServices from "../../components/features/TableServices";
import TablePackages from "../../components/features/TablePackages";
import TableInstallations from "../../components/features/TableInstallations";
import { Service } from "../../models/Service";
import { Installation } from "../../models/Installation";
import Package from "../../components/features/NewOrder/Package";
import { Package as IPackage } from "../../models/Package";

interface INewOrderQuote {
  idUtente: number;
  idItem: number;
}
interface INewOrderService {
  idUtente: number;
  idItem: number;
}

interface INewOrderPackage {
  idUtente: number;
  idItem: number;
  idImpianto: number;
}

interface INewOrderMaintenance {
  idUtente: number;
  idImpianto: number;
}

type KeyType = {
  [key: number | string]: any;
};

const paymentMethodsItems = [
  {
    name: "Contanti",
    value: "contanti",
    description: "Pagamento in contanti",
    icon: CashIcon,
  },
  {
    name: "Bonifico",
    value: "bonifico",
    description: "Pagamento tramite bonifico bancario",
    icon: LibraryIcon,
  },
];

const TabHeader = ["Preventivo", "Servizio", "Pacchetto", "Intervento"];

const Table: KeyType = {
  preventivo: TableQuotes,
  servizio: TableServices,
  pacchetto: TablePackages,
  intervento: TableInstallations,
};

const apiActionPost: KeyType = {
  0: mpApi.orders.actions.newOrderQuote,
  1: mpApi.orders.actions.newOrderService,
  2: mpApi.orders.actions.newOrderPackage,
  3: mpApi.orders.actions.newOrderMaintenance,
};

const apiActionGet: KeyType = {
  0: mpApi.quotes.actions.currentQuotesPerUser,
  1: mpApi.services.actions.items,
  2: mpApi.packages.actions.itemsFilteredByIdUser,
  3: mpApi.installations.actions.itemsFilteredByIdUser,
};

const NewOrdine = () => {
  const [items, setItems] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<{ item?: any; idUtente?: string; idItem?: string; idImpianto?: string } | null>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [listCustomers, setListCustomers] = useState<Customer[]>([]);
  const [filter, setFilter] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"contanti" | "bonifico">("contanti");

  const [isLoading, setIsLoading] = useState(false);

  const { push } = useRouter();
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<INewOrderQuote | INewOrderMaintenance | INewOrderService | INewOrderPackage>();

  const onSubmit: SubmitHandler<any> = async (formdata: any, e: any) => {
    e.preventDefault();

    const newFormData = Object.keys(formdata)
      .filter((key: any) => formdata[key] !== undefined)
      .reduce((obj: any, key: any) => {
        obj[key] = formdata[key];
        return obj;
      }, {});

    console.log("formdata", newFormData);
    setIsLoading(true);

    apiActionPost[tabIndex](newFormData, paymentMethod)
      .then((response: any) => {
        alert({
          id: new Date().toISOString(),
          type: "success",
          title: "Salvataggio Risorsa",
          message: response.message,
          read: false,
          isAlert: true,
        });
        setIsLoading(false);
        push("/ordini/detail/?id=" + response.data.id);
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
        Object.keys(reason.data.errors).forEach((field: string) => {
          setError(field as Path<INewOrderMaintenance> | Path<INewOrderPackage> | Path<INewOrderQuote> | Path<INewOrderService>, {
            type: "custom",
            message: reason.data.errors[field],
          });
        });
      });
  };

  const onSelectedItem = (item: any) => {
    setSelectedItem({ item, idItem: item.id });
  };

  const onValuePaymentMethodChange = (value: "contanti" | "bonifico") => {
    setPaymentMethod(value);
  };

  const TableComponent = useMemo(() => Table[TabHeader[tabIndex as number].toLowerCase()], [tabIndex]);

  const onValueIdImpiantoAndPacchetto = (idImpianto: string, idItem: string) => {
    setSelectedItem({ idImpianto, idItem });
    setValue("idImpianto", Number(idImpianto));
    setValue("idItem", Number(idItem));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res: any = await mpApi.customers.actions.autocomplete(1, 25, filter);

      const resCustomer = res.content;

      setListCustomers(resCustomer);
      setIsLoading(false);
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
    setItems(null);
    if (customer) {
      setValue("idUtente", customer.id);

      (async () => {
        setIsLoading(true);
        let res: any = "";

        apiActionGet[tabIndex](tabIndex !== 1 ? customer.id : "")
          .then((response: any) => {
            res = response.content;
            setItems(res);
            setIsLoading(false);
          })
          .catch((reason: any) => {
            alert({
              id: new Date().toISOString(),
              type: "error",
              title: "Caricamento Risorsa",
              message: reason.message,
              read: false,
              isAlert: true,
            });
            setIsLoading(false);
          });
      })();
    }
  }, [customer, tabIndex]);

  useEffect(() => {
    if (selectedItem) {
      if (tabIndex === 3) {
        selectedItem.item?.id && setValue("idImpianto", Number(selectedItem.item?.id));
      } else {
        setValue("idItem", selectedItem.idItem as any);
      }
    }
  }, [selectedItem]);

  useEffect(() => {
    console.log("items", items);
  }, [items]);

  return (
    <div>
      <h3 className="text-4xl font-bold leading-6 text-gray-900">{"Nuovo Ordine"}</h3>
      <div className="mt-10">
        <Tab.Group selectedIndex={tabIndex} onChange={(index: number) => setTabIndex(index)}>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {TabHeader.map((tab: string, index: number) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-primary-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-900/20 focus:outline-none ${
                    selected ? "bg-white shadow" : "text-gray-50 hover:bg-white/[0.12] hover:text-white"
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>

        <form
          onSubmit={(e) => {
            clearErrors();
            handleSubmit(onSubmit)(e);
          }}
          className="space-y-8 divide-y divide-gray-200 py-4 "
        >
          <div className="flex flex-col gap-8 py-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="block text-sm font-medium text-gray-700">Cerca Utente</span>
                {!customer && <span className="text-xs text-red-600">*cerca un utente prima di poter visualizzare risultati</span>}
              </div>
              <Combobox
                listItems={listCustomers}
                onFilterChange={(filters: any) => setFilter(filters)}
                onSelectedChange={(value: any) => setCustomer(value)}
                selectedName={customer ? customer?.nome + " " + customer?.cognome + ", " + customer?.indirizzo : filter}
                loading={isLoading}
                selected={customer}
              >
                {(item: Customer, selected, active) => (
                  <div className="flex items-center gap-4">
                    <span className={`block w-1/4 truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {item.nome + " " + item.cognome}
                    </span>
                    <span className="w-1/3">{item.indirizzo}</span>
                    {selected ? (
                      <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary-600"}`}>
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                )}
              </Combobox>
            </div>

            <RadioGroup value={paymentMethod} onChange={onValuePaymentMethodChange} className="space-y-3">
              <RadioGroup.Label>Pagamento</RadioGroup.Label>
              <div className="flex gap-2">
                {paymentMethodsItems.map((item) => (
                  <RadioGroup.Option value={item.value} key={item.name}>
                    {({ checked }) => (
                      <button
                        type="button"
                        title={item.description}
                        aria-label={item.description}
                        className={[
                          "flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 font-medium shadow",
                          checked ? "text-primary-600 shadow-inner" : "text-gray-500 shadow",
                        ].join(" ")}
                      >
                        <item.icon className="h-6 w-6 " /> {item.name}
                      </button>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

            {tabIndex !== 2 ? (
              <div className="space-y-3 ">
                {items &&
                  (items.length > 0 ? (
                    <>
                      <span className="font-medium">
                        <strong>
                          {TabHeader[tabIndex]
                            .substring(0, TabHeader[tabIndex].length - 1)
                            .concat("i")
                            .replace(/ii/, "i")}{" "}
                        </strong>
                        {"validi per l'utente"}
                      </span>

                      {!isLoading ? (
                        <TableComponent
                          items={items}
                          onSelectedItem={(item: any) => onSelectedItem(item)}
                          selectedItem={selectedItem ? { ...selectedItem, id: selectedItem.idItem } : null}
                        />
                      ) : null}
                    </>
                  ) : (
                    <span className="font-medium">{"Nessun preventivo in corso per l'utente selezionato"}</span>
                  ))}
              </div>
            ) : (
              customer && (
                <Package
                  items={items}
                  onValueIdImpiantoAndPacchetto={({ idImpianto, idItem }) => onValueIdImpiantoAndPacchetto(idImpianto, idItem)}
                />
              )
            )}
          </div>

          {customer && selectedItem && (
            <div className="pt-5">
              <div className="flex justify-end">
                {/* <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick={() => reset()}
              >
                Svuota campi
              </button> */}
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Salva
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <Overlay loading={isLoading} />
    </div>
  );
};

NewOrdine.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Nuovo Ordine">{page}</SidebarLayout>;
};
export default NewOrdine;
