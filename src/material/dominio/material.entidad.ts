export enum TipoMaterial {
  CONSUMIBLE = 'CONSUMIBLE',
  DEVOLUTIVO = 'DEVOLUTIVO',
}

export class Material {
  id: number;
  nombre: string;
  codigoUncs?: string;
  codigoSku?: string;
  codigoBarras?: string;
  tipo: TipoMaterial;
  categoria?: string;
  unidadMedida: string;
  fechaVencimiento?: Date;
  lote?: string;
  estadoFisico?: string;
   estadoId?: number;  
  fichaId?: number;
}