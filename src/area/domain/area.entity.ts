export class Area {
  id_area!: number;
  nombre!: string;
  descripcion!: string;
  estado!: boolean;
  id_sede?: number;
  id_usuario_encargado?: number;

  constructor(partial: Partial<Area>) {
    Object.assign(this, partial);
  }
}
