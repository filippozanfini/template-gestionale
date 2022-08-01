import { Customer } from "./Customer";
import { ICategory } from "./interfaces/Category";
import { Package } from "./Package";

export interface IInstallation {
  id?: number;
  utente?: Customer;
  categoriaImpianto?: ICategory;
  dataInstallazione?: string;
  pacchetti?: Package[];
  dirittoFissoDiChiamata?: number;
  tipologiaCircolazione?: string;
  marca?: string;
  tipoENumeroCollettori?: string;
  tipoELitriBollitore?: string;
  latitudine?: string;
  longitudine?: string;
}

export class Installation implements IInstallation {
  id: number;
  utente: Customer;
  categoriaImpianto: ICategory;
  dataInstallazione: string;
  pacchetti: Package[];
  dirittoFissoDiChiamata: number;
  tipologiaCircolazione: string;
  marca: string;
  tipoENumeroCollettori: string;
  tipoELitriBollitore: string;
  latitudine: string;
  longitudine: string;

  constructor(data: IInstallation) {
    this.id = data.id ?? 0;
    this.utente = data.utente ?? new Customer({});
    this.categoriaImpianto = data.categoriaImpianto ?? { id: 0, nome: "" };
    this.dataInstallazione = data.dataInstallazione ?? "";
    this.pacchetti = data.pacchetti ?? [];
    this.dirittoFissoDiChiamata = data.dirittoFissoDiChiamata ?? 0;
    this.tipologiaCircolazione = data.tipologiaCircolazione ?? "";
    this.marca = data.marca ?? "";
    this.tipoENumeroCollettori = data.tipoENumeroCollettori ?? "";
    this.tipoELitriBollitore = data.tipoELitriBollitore ?? "";
    this.latitudine = data.latitudine ?? "";
    this.longitudine = data.longitudine ?? "";
  }

  static factory(data: Installation): IInstallation {
    return {
      id: data.id,
      utente: data.utente,
      categoriaImpianto: data.categoriaImpianto,
      dataInstallazione: data.dataInstallazione,
      pacchetti: data.pacchetti,
      dirittoFissoDiChiamata: data.dirittoFissoDiChiamata,
      tipologiaCircolazione: data.tipologiaCircolazione,
      marca: data.marca,
      tipoENumeroCollettori: data.tipoENumeroCollettori,
      tipoELitriBollitore: data.tipoELitriBollitore,
      latitudine: data.latitudine,
      longitudine: data.longitudine,
    };
  }
}
