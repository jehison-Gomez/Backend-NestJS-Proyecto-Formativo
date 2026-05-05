export class Centro {
  id_centro!: number;
  nombre!: string;
  codigo!: string;
  direccion!: string;
  estado!: boolean;
  id_municipio?: number;

  constructor(partial: Partial<Centro>) {
    Object.assign(this, partial);
  }
}
