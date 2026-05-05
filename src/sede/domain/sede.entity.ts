export class Sede {
  id_sede!: number;
  nombre!: string;
  direccion!: string;
  estado!: boolean;
  id_centro?: number;

  constructor(partial: Partial<Sede>) {
    Object.assign(this, partial);
  }
}
