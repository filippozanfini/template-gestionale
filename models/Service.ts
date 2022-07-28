export interface IService {
  id?: number;
  nome?: string;
  descrizione?: string;
  costo?: number;
  novita?: boolean;
}

export class Service implements IService {
  id: number;
  costo: number;
  descrizione: string;
  novita: boolean;
  nome: string;

  constructor(data: IService) {
    this.id = data.id ?? 0;
    this.costo = data.costo ?? 0;
    this.descrizione = data.descrizione ?? "";
    this.novita = data.novita ?? false;
    this.nome = data.nome ?? "";
  }

  static factory(data: Service): IService {
    return {
      id: data.id,
      costo: data.costo,
      descrizione: data.descrizione,
      novita: data.novita,
      nome: data.nome,
    };
  }
}
