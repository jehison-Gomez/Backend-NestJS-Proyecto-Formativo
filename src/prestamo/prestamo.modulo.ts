import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamoOrmEntidad } from './infraestructura/persistencia/prestamo.orm-entidad.js';
import { TypeOrmPrestamoRepositorio } from './infraestructura/persistencia/typeorm-prestamo.repositorio.js';
import { PrestamoControlador } from './infraestructura/http/prestamo.controlador.js';
import { CrearPrestamoCasoUso } from './aplicacion/casos-de-uso/crear-prestamo.caso-uso.js';
import { BuscarTodosPrestamosCasoUso } from './aplicacion/casos-de-uso/buscar-todos-prestamos.caso-uso.js';
import { BuscarUnPrestamoCasoUso } from './aplicacion/casos-de-uso/buscar-un-prestamo.caso-uso.js';
import { ActualizarPrestamoCasoUso } from './aplicacion/casos-de-uso/actualizar-prestamo.caso-uso.js';
import { EliminarPrestamoCasoUso } from './aplicacion/casos-de-uso/eliminar-prestamo.caso-uso.js';

@Module({
  imports: [TypeOrmModule.forFeature([PrestamoOrmEntidad])],
  controllers: [PrestamoControlador],
  providers: [
    TypeOrmPrestamoRepositorio,
    { provide: CrearPrestamoCasoUso, useFactory: (r) => new CrearPrestamoCasoUso(r), inject: [TypeOrmPrestamoRepositorio] },
    { provide: BuscarTodosPrestamosCasoUso, useFactory: (r) => new BuscarTodosPrestamosCasoUso(r), inject: [TypeOrmPrestamoRepositorio] },
    { provide: BuscarUnPrestamoCasoUso, useFactory: (r) => new BuscarUnPrestamoCasoUso(r), inject: [TypeOrmPrestamoRepositorio] },
    { provide: ActualizarPrestamoCasoUso, useFactory: (r,b) => new ActualizarPrestamoCasoUso(r,b), inject: [TypeOrmPrestamoRepositorio, BuscarUnPrestamoCasoUso] },
    { provide: EliminarPrestamoCasoUso, useFactory: (r,b) => new EliminarPrestamoCasoUso(r,b), inject: [TypeOrmPrestamoRepositorio, BuscarUnPrestamoCasoUso] },
  ],
  exports: [BuscarUnPrestamoCasoUso],
})
export class PrestamoModulo {}