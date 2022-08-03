import { ICategory } from "./interfaces/Category";

export class Category implements ICategory {
  id: number;
  name: string;

  constructor(data: ICategory) {
    this.id = data.id ?? 0;
    this.name = data.nome ?? "";
  }

  static factory(data: Category): ICategory {
    return {
      id: data.id,
      nome: data.name,
    };
  }
}
