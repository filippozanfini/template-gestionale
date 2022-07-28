import { ICategory } from "./interfaces/Category";

export interface IPackage {
  id?: number;
  nome?: string;
  descrizione?: string;
  costo?: number;
  novita?: boolean;
  categorie?: ICategory[];
}

export class Package implements IPackage {
  id: number;
  nome: string;
  descrizione: string;
  costo: number;
  novita: boolean;
  categorie: ICategory[];

  constructor(data: IPackage) {
    this.id = data.id ?? 0;
    this.nome = data.nome ?? "";
    this.descrizione = data.descrizione ?? "";
    this.costo = data.costo ?? 0;
    this.novita = data.novita ?? false;
    this.categorie = data.categorie ?? [];
  }

  static factory(data: Package): IPackage {
    return {
      id: data.id,
      nome: data.nome,
      descrizione: data.descrizione,
      costo: data.costo,
      novita: data.novita,
      categorie: data.categorie,
    };
  }
}
