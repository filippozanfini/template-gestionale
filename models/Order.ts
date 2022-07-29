import { Customer, ICustomer } from "./Customer";
import { IPackage, Package } from "./Package";
import { IQuote, Quote } from "./Quote";
import { IService, Service } from "./Service";

export enum eOrderStatus {
  "inCorso" = "IN CORSO",
  "pagato" = "PAGATO",
  "concluso" = "CONCLUSO",
  "annullato" = "ANNULLATO",
  "none" = "NONE",
}

export interface IOrder {
  id?: number;
  stato?: eOrderStatus;
  utente?: ICustomer;
  dataAcquisto?: Date | string;
  importo?: number;
  preventivo?: IQuote;
  pacchetto?: IPackage;
  servizio?: IService;
  intervento?: {
    descrizione: string;
  };
  idImpianto?: number;
}

export class Order implements IOrder {
  id: number;
  stato: eOrderStatus;
  utente: ICustomer;
  dataAcquisto: Date | string;
  importo: number;
  preventivo: IQuote;
  pacchetto: IPackage;
  servizio: IService;
  intervento: {
    descrizione: string;
  };
  idImpianto: number;

  constructor(data: IOrder) {
    this.id = data.id ?? 0;
    this.stato = data.stato ?? eOrderStatus.inCorso;
    this.utente = data.utente ?? new Customer({});
    this.dataAcquisto = data.dataAcquisto ?? new Date();
    this.importo = data.importo ?? 0;
    this.preventivo = data.preventivo ?? new Quote({});
    this.pacchetto = data.pacchetto ?? new Package({});
    this.servizio = data.servizio ?? new Service({});
    this.intervento = data.intervento ?? {
      descrizione: "",
    };
    this.idImpianto = data.idImpianto ?? 0;
  }

  static factory(data: Order): IOrder {
    return {
      id: data.id,
      stato: data.stato,
      utente: Customer.factory(new Customer(data.utente)),
      dataAcquisto: data.dataAcquisto,
      importo: data.importo,
      preventivo: Quote.factory(new Quote(data.preventivo)),
      pacchetto: Package.factory(new Package(data.pacchetto)),
      servizio: Service.factory(new Service(data.servizio)),
      intervento: data.intervento,
      idImpianto: data.idImpianto,
    };
  }

  static factoryResponse(data: any): any {
    return {
      id: data.id,
      stato: data.stato,
    };
  }

  static dateToString(date: Date | string): string {
    if (typeof date === "string") {
      return date;
    }

    return date.toLocaleDateString("it-IT");
  }
}
