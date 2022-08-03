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
  none: eOrderStatus.none,
};

export const InverterOrderStatusMapper: InverterOrderStatusMapper = {
  "IN CORSO": "inCorso",
  PAGATO: "pagato",
  CONCLUSO: "concluso",
  ANNULLATO: "annullato",
  NONE: "none",
};
