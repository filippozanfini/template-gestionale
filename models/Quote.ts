import { Customer, ICustomer } from "./Customer";

export enum eQuoteStatus {
  inCorso = "IN CORSO",
  accettato = "ACCETTATO",
  nonAccettato = "NON ACCETTATO",
  scaduto = "SCADUTO",
  none = "NONE",
}

export interface IQuote {
  id?: number;
  dataScadenza?: Date;
  utente?: ICustomer;
  costo?: number;
  descrizione?: string;
  statoPreventivo?: eQuoteStatus;
}
export class Quote implements IQuote {
  [x: string]: any;
  id: number;
  dataScadenza: Date;
  utente: ICustomer;
  costo: number;
  descrizione: string;
  statoPreventivo: eQuoteStatus;
  item: any;

  constructor(data: IQuote) {
    this.id = data.id ?? 0;
    this.dataScadenza = data.dataScadenza ?? new Date();
    this.utente = data.utente ?? new Customer({});
    this.costo = data.costo ?? 0;
    this.descrizione = data.descrizione ?? "";
    this.statoPreventivo = data.statoPreventivo ?? eQuoteStatus.inCorso;
  }

  static factory(data: Quote): IQuote {
    return {
      id: data.id,
      dataScadenza: data.dataScadenza,
      utente: Customer.factory(new Customer(data.utente)),
      costo: data.costo,
      descrizione: data.descrizione,
      statoPreventivo: data.statoPreventivo,
    };
  }

  static factoryResponse(data: any): any {
    const idUtente = data.id > 0 ? data?.utente?.id : data.idUtente;
    return {
      costo: data.costo,
      idUtente: idUtente,
      descrizione: data.descrizione,
    };
  }
}
