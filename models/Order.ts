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
  stato?: string;
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
  paypalDetails?: any;
  listaStati?: any[];
}

export class Order implements IOrder {
  id: number;
  stato: string;
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
  paypalDetails: any;
  listaStati: any[];

  constructor(data: IOrder) {
    this.id = data.id ?? 0;
    this.stato = data.stato ?? "none";
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
    this.paypalDetails = data.paypalDetails ?? null;
    this.listaStati = data.listaStati ?? [];
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
      paypalDetails: data.paypalDetails,
      listaStati: data.listaStati,
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

  // return object with eorderstatus as key and value as string
  static getOrderStatus() {
    return {
      vuoto: "Vuoto",
      inCorso: "IN CORSO",
      pagato: "PAGATO",
      concluso: "CONCLUSO",
      annullato: "ANNULLATO",
    };
  }

  static getOrderBy() {
    return {
      vuoto: "Vuoto",
      importo: "IMPORTO",
      dataDiAcquisto: "DATA DI ACQUISTO",
    };
  }
}
