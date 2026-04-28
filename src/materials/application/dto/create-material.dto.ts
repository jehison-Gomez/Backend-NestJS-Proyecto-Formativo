export class CreateMaterialDto {
  codigo: string;
  nombre: string;
  descripcion: string;
  unidadMedida: string;
  cantidadDisponible: number;
  cantidadMinima: number;
  estado: string;
  tipo: string;
  id_area: number;
  id_ficha: number;
}
