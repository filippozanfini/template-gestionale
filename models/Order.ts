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
  "accettato" = "ACCETTATO",
  "nonAccettato" = "NON ACCETTATO",
  "scaduto" = "SCADUTO",
}

export interface IOrder {
  id?: number;
  stato?: string;
  utente?: ICustomer;
  dataDiAcquisto?: string | Date;
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
  collaboratore?: ICustomer;
}

export class Order implements IOrder {
  id: number;
  stato: string;
  utente: ICustomer;
  dataDiAcquisto: string | Date;
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
  collaboratore: ICustomer;

  constructor(data: IOrder) {
    this.id = data.id ?? 0;
    this.stato = data.stato ?? "none";
    this.utente = data.utente ?? new Customer({});
    this.dataDiAcquisto = data.dataDiAcquisto ?? "";
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
    this.collaboratore = data.collaboratore ?? new Customer({});
  }

  static factory(data: Order): IOrder {
    return {
      id: data.id,
      stato: data.stato,
      utente: Customer.factory(new Customer(data.utente)),
      dataDiAcquisto: data.dataDiAcquisto,
      importo: data.importo,
      preventivo: Quote.factory(new Quote(data.preventivo)),
      pacchetto: Package.factory(new Package(data.pacchetto)),
      servizio: Service.factory(new Service(data.servizio)),
      intervento: data.intervento,
      idImpianto: data.idImpianto,
      paypalDetails: data.paypalDetails,
      listaStati: data.listaStati,
      collaboratore: Customer.factory(new Customer(data.collaboratore)),
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
      nonAccettato: "NON ACCETTATO",
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
