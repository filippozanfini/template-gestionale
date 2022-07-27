import { Customer, ICustomer } from "./Customer";

export enum eStatoPreventivo {
  "inCorso" = "IN CORSO",
  "accettato" = "ACCETTATO",
  "nonAccettato" = "NON ACCETTATO",
  "scaduto" = "SCADUTO",
}

export interface IPreventivo {
  id: number;
  dataScadenza?: Date;
  utente?: ICustomer;
  costo?: number;
  descrizione?: string;
  statoPreventivo?: eStatoPreventivo;
}
export class Preventivo implements IPreventivo {
  id: number;
  dataScadenza: Date;
  utente: ICustomer;
  costo: number;
  descrizione: string;
  statoPreventivo: eStatoPreventivo;

  constructor(data: IPreventivo) {
    this.id = data.id ?? 0;
    this.dataScadenza = data.dataScadenza ?? new Date();
    this.utente = data.utente ?? new Customer({});
    this.costo = data.costo ?? 0;
    this.descrizione = data.descrizione ?? "";
    this.statoPreventivo = data.statoPreventivo ?? eStatoPreventivo.inCorso;
  }

  static factory(data: Preventivo): IPreventivo {
    return {
      id: data.id,
      dataScadenza: data.dataScadenza,
      utente: Customer.factory(new Customer(data.utente)),
      costo: data.costo,
      descrizione: data.descrizione,
      statoPreventivo: data.statoPreventivo,
    };
  }
}
