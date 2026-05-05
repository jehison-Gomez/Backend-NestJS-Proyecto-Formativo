export class Municipio {
  id_municipio!: number;
  nombre!: string;
  codigo!: string;
  estado!: boolean;
  id_departamento?: number;

  constructor(partial: Partial<Municipio>) {
    Object.assign(this, partial);
  }
}
