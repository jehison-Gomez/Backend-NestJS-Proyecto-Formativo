import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialUbicacionOrmEntidad } from './infraestructura/persistencia/material-ubicacion.orm-entidad';
import { TypeOrmMaterialUbicacionRepositorio } from './infraestructura/persistencia/typeorm-material-ubicacion.repositorio';
import { MaterialUbicacionControlador } from './infraestructura/http/material-ubicacion.controlador';
import { CrearMaterialUbicacionCasoUso } from './aplicacion/casos-de-uso/crear-material-ubicacion.caso-uso';
import { BuscarTodosMaterialUbicacionCasoUso } from './aplicacion/casos-de-uso/buscar-todos-material-ubicacion.caso-uso';
import { BuscarUnMaterialUbicacionCasoUso } from './aplicacion/casos-de-uso/buscar-un-material-ubicacion.caso-uso';
import { EliminarMaterialUbicacionCasoUso } from './aplicacion/casos-de-uso/eliminar-material-ubicacion.caso-uso';
@Module({
  imports: [TypeOrmModule.forFeature([MaterialUbicacionOrmEntidad])],
  controllers: [MaterialUbicacionControlador],
  providers: [
    TypeOrmMaterialUbicacionRepositorio,
    { provide: CrearMaterialUbicacionCasoUso, useFactory: (r) => new CrearMaterialUbicacionCasoUso(r), inject: [TypeOrmMaterialUbicacionRepositorio] },
    { provide: BuscarTodosMaterialUbicacionCasoUso, useFactory: (r) => new BuscarTodosMaterialUbicacionCasoUso(r), inject: [TypeOrmMaterialUbicacionRepositorio] },
    { provide: BuscarUnMaterialUbicacionCasoUso, useFactory: (r) => new BuscarUnMaterialUbicacionCasoUso(r), inject: [TypeOrmMaterialUbicacionRepositorio] },
    { provide: EliminarMaterialUbicacionCasoUso, useFactory: (r, b) => new EliminarMaterialUbicacionCasoUso(r, b), inject: [TypeOrmMaterialUbicacionRepositorio, BuscarUnMaterialUbicacionCasoUso] },
  ],
})
export class MaterialUbicacionModulo {}