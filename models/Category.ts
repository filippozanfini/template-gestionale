import { ICategory } from "./interfaces/Category";

export class Category implements ICategory {
  id: string;
  nome: string;

  constructor(data: ICategory) {
    this.id = data.id ?? "0";
    this.nome = data.nome ?? "";
  }

  static factory(data: Category): ICategory {
    return {
      id: data.id,
      nome: data.nome,
    };
  }
}
