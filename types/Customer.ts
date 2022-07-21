export interface ICustomer {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  indirizzo: string;
  lat: number;
  lon: number;
  tel: string;
  username: string;
  ruoli: string[];
  privacyAccettata: boolean;
}

export class Customer implements ICustomer {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  indirizzo: string;
  lat: number;
  lon: number;
  tel: string;
  username: string;
  ruoli: string[];
  privacyAccettata: boolean;

  constructor(data: ICustomer) {
    this.id = data.id;
    this.nome = data.nome;
    this.cognome = data.cognome;
    this.email = data.email;
    this.indirizzo = data.indirizzo;
    this.lat = data.lat;
    this.lon = data.lon;
    this.tel = data.tel;
    this.username = data.username;
    this.ruoli = data.ruoli;
    this.privacyAccettata = data.privacyAccettata;
  }

  static factory(data: Customer): ICustomer {
    return {
      id: data.id,
      nome: data.nome,
      cognome: data.cognome,
      email: data.email,
      indirizzo: data.indirizzo,
      lat: data.lat,
      lon: data.lon,
      tel: data.tel,
      username: data.username,
      ruoli: data.ruoli,
      privacyAccettata: data.privacyAccettata,
    };
  }
}
