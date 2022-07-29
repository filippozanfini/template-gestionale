export interface ICustomer {
  id?: number;
  codiceFiscale?: string;
  nome?: string;
  cognome?: string;
  email?: string;
  indirizzo?: string;
  lat?: number;
  lon?: number;
  tel?: string;
  username?: string;
  ruoli?: string[];
  privacyAccettata?: boolean;
}

export class Customer implements ICustomer {
  id: number;
  codiceFiscale: string;
  nome: string;
  cognome: string;
  email: string;
  indirizzo: string;
  lat: number;
  lon: number;
  tel: string;
  ruoli: string[];
  privacyAccettata: boolean;

  constructor(data: ICustomer) {
    this.id = data.id ?? 0;
    this.codiceFiscale = data.codiceFiscale ?? "";
    this.nome = data.nome ?? "";
    this.cognome = data.cognome ?? "";
    this.email = data.email ?? "";
    this.indirizzo = data.indirizzo ?? "";
    this.lat = data.lat ?? 0;
    this.lon = data.lon ?? 0;
    this.tel = data.tel ?? "";
    this.ruoli = data.ruoli ?? [];
    this.privacyAccettata = data.privacyAccettata ?? false;
  }

  static factory(data: Customer): ICustomer {
    return {
      id: data.id,
      codiceFiscale: data.codiceFiscale,
      nome: data.nome,
      cognome: data.cognome,
      email: data.email,
      indirizzo: data.indirizzo,
      lat: data.lat,
      lon: data.lon,
      tel: data.tel,
      ruoli: data.ruoli,
      privacyAccettata: data.privacyAccettata,
    };
  }

  static factoryResponse(data: any): ICustomer {
    const tempCustomer: any = {
      id: data.id,
      codiceFiscale: data.codiceFiscale,
      nome: data.nome,
    };

    Object.keys(tempCustomer).forEach((key) => {
      if (tempCustomer[key] == null || tempCustomer[key] == undefined) {
        delete tempCustomer[key];
      }
    });

    return tempCustomer;
  }
}
