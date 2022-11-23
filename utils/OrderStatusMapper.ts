import { eOrderStatus } from "../models/Order";

type OrderStatusMapperType = {
  [key: string]: eOrderStatus;
};

type InverterOrderStatusMapper = {
  [key: string]: string;
};

export const OrderStatusMapper: OrderStatusMapperType = {
  inCorso: eOrderStatus.inCorso,
  pagato: eOrderStatus.pagato,
  concluso: eOrderStatus.concluso,
  annullato: eOrderStatus.annullato,
  accettato: eOrderStatus.accettato,
  nonAccettato: eOrderStatus.nonAccettato,
  scaduto: eOrderStatus.scaduto,
  none: eOrderStatus.none,
};

export const InverterOrderStatusMapper: InverterOrderStatusMapper = {
  "IN CORSO": "inCorso",
  PAGATO: "pagato",
  CONCLUSO: "concluso",
  ANNULLATO: "annullato",
  "NON ACCETTATO": "nonAccettato",
  SCADUTO: "scaduto",
  NONE: "none",
};
