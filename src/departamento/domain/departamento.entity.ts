export class Departamento {
  id_departamento!: number;
  nombre!: string;
  codigo!: string;
  estado!: boolean;

  constructor(partial: Partial<Departamento>) {
    Object.assign(this, partial);
  }
}
