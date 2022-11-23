export interface ICustomer {
  id?: number;
  codiceFiscale?: string;
  nome?: string;
  cognome?: string;
  email?: string;
  indirizzo?: string;
  latitudine?: number;
  longitudine?: number;
  numeroDiTelefono?: string;
  username?: string;
  ruolo?: string;
  privacyAccettata?: boolean;
}

export class Customer implements ICustomer {
  id: number;
  codiceFiscale: string;
  nome: string;
  cognome: string;
  email: string;
  indirizzo: string;
  latitudine: number;
  longitudine: number;
  numeroDiTelefono: string;
  ruolo: string;
  privacyAccettata: boolean;

  constructor(data: ICustomer) {
    this.id = data.id ?? 0;
    this.codiceFiscale = data.codiceFiscale ?? "";
    this.nome = data.nome ?? "";
    this.cognome = data.cognome ?? "";
    this.email = data.email ?? "";
    this.indirizzo = data.indirizzo ?? "";
    this.latitudine = data.latitudine ?? 0;
    this.longitudine = data.longitudine ?? 0;
    this.numeroDiTelefono = data.numeroDiTelefono ?? "";
    this.ruolo = data.ruolo ?? "";
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
      latitudine: data.latitudine,
      longitudine: data.longitudine,
      numeroDiTelefono: data.numeroDiTelefono,
      ruolo: data.ruolo,
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
