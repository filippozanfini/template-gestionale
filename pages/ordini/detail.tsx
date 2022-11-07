import { useRouter } from "next/router";
import React, { useState, useEffect, FC, ReactElement, useMemo } from "react";
import { useAlert } from "../../components/notifications";
import ComboBoxCollaboratori from "../../components/shared/ComboBox/ComboBoxCollaboratori/ComboBoxCollaboratori";
import ListBox from "../../components/shared/ListBox/ListBox";
import Overlay from "../../components/shared/Overlay";
import { Table } from "../../components/shared/Table/Table";
import SidebarLayout from "../../layouts/SidebarLayout";
import { mpApi } from "../../lib/mpApi";
import { Customer } from "../../models/Customer";
import { eOrderStatus, IOrder, Order } from "../../models/Order";
import { InverterOrderStatusMapper, OrderStatusMapper } from "../../utils/OrderStatusMapper";
import { NextPageWithLayout } from "../_app";

const DetailPage: NextPageWithLayout = () => {
  const [item, setItem] = useState<Order | null>();
  const [collaborator, setCollaborator] = useState<Customer | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const { push, query } = useRouter();
  const alert = useAlert();

  const loadItem = async (ItemId: number) => {
    if (ItemId === 0) {
      return null;
    } else {
      return mpApi.orders.actions
        .item(ItemId)
        .then((data: any) => {
          setItem(data);
          setCollaborator(data.collaboratore);
        })
        .catch((data: any) => {
          setItem(null);
        });
    }
  };

  const listOrderStatus = Object.values(eOrderStatus).filter((value) => {
    return value !== "NONE" && value !== "NON ACCETTATO" && value !== "SCADUTO" && value !== "ACCETTATO";
  });

  const nomeAcquisto = item?.servizio ? item.servizio.nome : item?.pacchetto ? item?.pacchetto.nome : "";
  const costoAcquisto = item?.servizio
    ? item.servizio.costo
    : item?.pacchetto
    ? item.pacchetto.costo
    : item?.preventivo
    ? item?.preventivo.costo
    : "";
  const idAcquisto = item?.servizio ? item.servizio.id : item?.pacchetto ? item.pacchetto.id : "";

  const backgroundCss = useMemo(() => {
    return item?.stato === "inCorso"
      ? "bg-gray-600"
      : item?.stato === "pagato"
      ? "bg-blue-500"
      : item?.stato === "concluso"
      ? "bg-green-500"
      : "bg-red-500";
  }, [item?.stato]);

  const handleOrderStatus = async (order: Order, newOrderStatus: string) => {
    setIsLoading(true);
    await mpApi.orders.actions
      .save(order, newOrderStatus)
      .then((response: any) => {
        alert({
          id: new Date().toISOString(),
          type: "success",
          title: "Salvataggio Risorsa",
          message: response.message,
          read: false,
          isAlert: true,
        });
        if (response.data.id) {
          loadItem(response.data.id || order.id);
        }
        setIsLoading(false);
      })
      .catch((error: any) => {
        alert({
          id: new Date().toISOString(),
          type: "error",
          title: "Salvataggio Risorsa",
          message: error?.message ?? "Errore nell'aggiornamento dello stato dell'ordine, riprovare più tardi",
          read: false,
          isAlert: true,
        });
        loadItem(order.id);
        setIsLoading(false);
      });
  };

  const onSelectedCollabs = (value: any) => {
    setCollaborator(value);
  };

  const assignCollaboratorAtOrder = async (idOrder: number) => {
    if (collaborator) {
      setIsLoading(true);
      mpApi.orders.actions
        .assignCollabAtOrder(idOrder, collaborator.id)
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
        })
        .catch((error: any) => {
          alert({
            id: new Date().toISOString(),
            type: "error",
            title: "Salvataggio Risorsa",
            message: error.message,
            read: false,
            isAlert: true,
          });
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    if (query.id) {
      const ItemId: number = Number(query.id);
      loadItem(ItemId);
    }
  }, [query]);

  useEffect(() => {
    if (collaborator?.id && item?.id && item?.collaboratore?.id !== collaborator?.id) {
      assignCollaboratorAtOrder(item.id);
    }
  }, [collaborator]);

  useEffect(() => {
    console.log("item", item);
  }, [item]);

  return (
    <>
      {item && (
        <div className="mt-5 flex flex-col gap-4 rounded-xl bg-white p-20 pt-10">
          <h3 className="text-4xl font-bold leading-6 text-gray-900">ID Ordine: {item.id}</h3>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400">
                Data di acquisto:{" "}
                <span className="font-semibold text-black">{item.dataDiAcquisto ? Order.dateToString(item.dataDiAcquisto) : ""}</span>
              </p>
              <p className="text-gray-400">
                Acquirente: <span className="font-semibold text-black">{item.utente.nome + " " + item.utente.cognome}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-semibold ">Stato ordine:</p>
              <div className="z-50 w-36">
                <ListBox
                  backgroundColor={backgroundCss}
                  textColor="text-white"
                  listItems={listOrderStatus}
                  onChange={(value: any) => handleOrderStatus(item, InverterOrderStatusMapper[value])}
                  selected={OrderStatusMapper[item.stato ?? "none"] === "NONE" ? "" : OrderStatusMapper[item.stato ?? "none"]}
                  selectedName={OrderStatusMapper[item.stato ?? "none"] ?? ""}
                />
              </div>
            </div>
          </div>

          <div className=" space-y-10">
            <div className="mt-5 w-full">
              <ComboBoxCollaboratori
                onSelectedChange={(value) => onSelectedCollabs(value)}
                defaultValue={collaborator}
                label="Cambia Collaboratore Assegnato"
              />
            </div>

            <div>
              <p className="mb-2 text-lg font-semibold text-black">Servizio:</p>

              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.Cell>ID</Table.Cell>
                    <Table.Cell>Nome</Table.Cell>
                    <Table.Cell>Costo</Table.Cell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{idAcquisto}</Table.Cell>
                    <Table.Cell>
                      {nomeAcquisto ? nomeAcquisto : item.intervento ? `Intervento` : `Preventivo n. ${item.preventivo.id}`}
                    </Table.Cell>
                    <Table.Cell>{costoAcquisto} €</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>

            <div className="flex justify-between gap-4">
              {item.paypalDetails && (
                <div className="h-[260px] w-1/2 flex-col justify-center rounded-xl bg-gray-50 p-10">
                  <p className="text-bold text-xl font-bold">Dati pagamento</p>
                  <div className="mt-5 flex flex-col gap-4">
                    <p className="text-gray-400">
                      ID Transazione: <span className="font-semibold text-black">{item.paypalDetails.orderID}</span>
                    </p>
                    <p className="text-gray-400">
                      Nome acquirente:{" "}
                      <span className="font-semibold text-black">
                        {item.paypalDetails.payer.name + " " + item.paypalDetails.payer.surname}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      Email acquirente: <span className="font-semibold text-black">{item.paypalDetails.payer.email}</span>
                    </p>
                  </div>
                </div>
              )}
              <div className="max-h-[400px] w-1/2 flex-col justify-center rounded-xl bg-gray-50 p-10">
                <p className="text-bold text-right text-xl font-bold">Storico stato</p>
                <div className="mt-5 flex max-h-[290px] flex-col gap-4 overflow-y-auto">
                  {item.listaStati.map((l: any) => {
                    return (
                      <div key={l.id} className="flex w-full items-center justify-end gap-3">
                        <p className="text-prim-400 text-right">
                          Stato: <span className="font-semibold text-blue-400">{OrderStatusMapper[l.nome]}</span>
                        </p>
                        <div className="h-[15px] w-[1px] bg-gray-400" />
                        <p className="text-right text-gray-400">
                          Data: <span className="font-semibold text-black">{l.dataStato}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 h-[1px] w-full bg-gray-200" />

          <div className="mt-4 flex flex-col gap-2">
            <p className="text-right text-3xl font-bold">Totale</p>
            <p className="text-right text-2xl font-bold text-gray-400">{item.importo} €</p>
          </div>

          <Overlay loading={isLoading} text={"Aggiornamento dati"} />
        </div>
      )}
    </>
  );
};

DetailPage.getLayout = function getLayout(page: ReactElement) {
  return <SidebarLayout title="Dettaglio ordine">{page}</SidebarLayout>;
};
export default DetailPage;
