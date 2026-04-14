import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrasladoOrmEntidad } from './infraestructura/persistencia/traslado.orm-entidad';
import { TypeOrmTrasladoRepositorio } from './infraestructura/persistencia/typeorm-traslado.repositorio';
import { TrasladoControlador } from './infraestructura/http/traslado.controlador.js';
import { CrearTrasladoCasoUso } from './aplicacion/casos-de-uso/crear-traslado.caso-uso.js';
import { BuscarTodosTrasladosCasoUso } from './aplicacion/casos-de-uso/buscar-todos-traslados.caso-uso';
import { BuscarUnTrasladoCasoUso } from './aplicacion/casos-de-uso/buscar-un-traslado.caso-uso';
import { ActualizarTrasladoCasoUso } from './aplicacion/casos-de-uso/actualizar-traslado.caso-uso';
import { EliminarTrasladoCasoUso } from './aplicacion/casos-de-uso/eliminar-traslado.caso-uso';

@Module({
  imports: [TypeOrmModule.forFeature([TrasladoOrmEntidad])],
  controllers: [TrasladoControlador],
  providers: [
    TypeOrmTrasladoRepositorio,
    { provide: CrearTrasladoCasoUso, useFactory: (r) => new CrearTrasladoCasoUso(r), inject: [TypeOrmTrasladoRepositorio] },
    { provide: BuscarTodosTrasladosCasoUso, useFactory: (r) => new BuscarTodosTrasladosCasoUso(r), inject: [TypeOrmTrasladoRepositorio] },
    { provide: BuscarUnTrasladoCasoUso, useFactory: (r) => new BuscarUnTrasladoCasoUso(r), inject: [TypeOrmTrasladoRepositorio] },
    { provide: ActualizarTrasladoCasoUso, useFactory: (r, b) => new ActualizarTrasladoCasoUso(r, b), inject: [TypeOrmTrasladoRepositorio, BuscarUnTrasladoCasoUso] },
    { provide: EliminarTrasladoCasoUso, useFactory: (r, b) => new EliminarTrasladoCasoUso(r, b), inject: [TypeOrmTrasladoRepositorio, BuscarUnTrasladoCasoUso] },
  ],
  exports: [BuscarUnTrasladoCasoUso],
})
export class TrasladoModulo {}