export enum EstadoTraslado {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADO = 'COMPLETADO',
  CANCELADO = 'CANCELADO',
}

export class Traslado {
  trasladoId: number;
  fechaTraslado: Date;
  motivo?: string;
  estado: EstadoTraslado;
  usuarioId: number;        
  ubicacionDestinoId: number;  
  ubicacionOrigenId: number;  
}