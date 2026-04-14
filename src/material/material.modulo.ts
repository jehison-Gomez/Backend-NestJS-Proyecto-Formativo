import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialOrmEntidad } from './infraestructura/persistencia/material.orm-entidad';
import { MaterialUbicacionOrmEntidad } from '../material-ubicacion/infraestructura/persistencia/material-ubicacion.orm-entidad';
import { TypeOrmMaterialRepositorio } from './infraestructura/persistencia/typeorm-material.repositorio';
import { MaterialControlador } from './infraestructura/http/material.controlador';
import { CrearMaterialCasoUso } from './aplicacion/casos-de-uso/crear-material.caso-uso';
import { BuscarTodosMaterialesCasoUso } from './aplicacion/casos-de-uso/buscar-todos-materiales.caso-uso';
import { BuscarUnMaterialCasoUso } from './aplicacion/casos-de-uso/buscar-un-material.caso-uso';
import { ActualizarMaterialCasoUso } from './aplicacion/casos-de-uso/actualizar-material.caso-uso';
import { EliminarMaterialCasoUso } from './aplicacion/casos-de-uso/eliminar-material.caso-uso';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MaterialOrmEntidad, 
      MaterialUbicacionOrmEntidad
    ])
  ],
  controllers: [MaterialControlador],
  providers: [
    TypeOrmMaterialRepositorio,
    {
      provide: CrearMaterialCasoUso,
      useFactory: (repo: TypeOrmMaterialRepositorio) =>
        new CrearMaterialCasoUso(repo),
      inject: [TypeOrmMaterialRepositorio],
    },
    {
      provide: BuscarTodosMaterialesCasoUso,
      useFactory: (repo: TypeOrmMaterialRepositorio) =>
        new BuscarTodosMaterialesCasoUso(repo),
      inject: [TypeOrmMaterialRepositorio],
    },
    {
      provide: BuscarUnMaterialCasoUso,
      useFactory: (repo: TypeOrmMaterialRepositorio) =>
        new BuscarUnMaterialCasoUso(repo),
      inject: [TypeOrmMaterialRepositorio],
    },
    {
      provide: ActualizarMaterialCasoUso,
      useFactory: (repo: TypeOrmMaterialRepositorio, buscarUno: BuscarUnMaterialCasoUso) =>
        new ActualizarMaterialCasoUso(repo, buscarUno),
      inject: [TypeOrmMaterialRepositorio, BuscarUnMaterialCasoUso],
    },
    {
      provide: EliminarMaterialCasoUso,
      useFactory: (repo: TypeOrmMaterialRepositorio, buscarUno: BuscarUnMaterialCasoUso) =>
        new EliminarMaterialCasoUso(repo, buscarUno),
      inject: [TypeOrmMaterialRepositorio, BuscarUnMaterialCasoUso],
    },
  ],
  exports: [BuscarUnMaterialCasoUso],
})
export class MaterialModulo {}