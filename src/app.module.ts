import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { DepartamentosModule }        from './departamentos/departamentos.module';
import { MunicipiosModule }           from './municipios/municipios.module';
import { CentrosModule }              from './centros/centros.module';
import { SedesModule }                from './sedes/sedes.module';
import { AreasModule }                from './areas/areas.module';
import { ProgramasModule }            from './programas/programas.module';
import { FichasModule }               from './fichas/fichas.module';
import { UsuariosModule }             from './usuarios/usuarios.module';
import { RolesModule }                from './roles/roles.module';
import { PermisosModule }             from './permisos/permisos.module';
import { Rol_permisosModule }         from './rol_permisos/rol_permisos.module';
import { Tipo_ubicacionModule }       from './tipo_ubicacion/tipo_ubicacion.module';
import { Categoria_materialModule }   from './categoria_material/categoria_material.module';
import { UbicacionModule }            from './ubicacion/ubicacion.module';
import { Material_ubicacionModule }   from './material_ubicacion/material_ubicacion.module';
import { MaterialesModule }           from './materiales/materiales.module';
import { Material_itemModule }        from './material_item/material_item.module';
import { Material_consumibleModule }  from './material_consumible/material_consumible.module';
import { MovimientosModule }          from './movimientos/movimientos.module';
import { PrestamosModule }            from './prestamos/prestamos.module';
import { PrestamoItemModule }         from './prestamo_item/prestamo_item.module';
import { PrestamoConsumibleModule }   from './prestamo_consumible/prestamo_consumible.module';
import { DevolucionesModule }         from './devoluciones/devoluciones.module';
import { DevolucionItemModule }       from './devolucion_item/devolucion_item.module';
import { NovedadesModule }            from './novedades/novedades.module';
import { KardexModule }               from './kardex/kardex.module';
import { AuthModule }                 from './auth/auth.module';
import { Usuario_permisosModule }     from './usuario_permisos/usuario_permisos.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5433'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    DepartamentosModule,
    MunicipiosModule,
    CentrosModule,
    SedesModule,
    AreasModule,
    ProgramasModule,
    FichasModule,
    UsuariosModule,
    RolesModule,
    PermisosModule,
    Rol_permisosModule,
    Tipo_ubicacionModule,
    Categoria_materialModule,
    UbicacionModule,
    Material_ubicacionModule,
    MaterialesModule,
    Material_itemModule,
    Material_consumibleModule,
    MovimientosModule,
    PrestamosModule,
    PrestamoItemModule,
    PrestamoConsumibleModule,
    DevolucionesModule,
    DevolucionItemModule,
    NovedadesModule,
    KardexModule,
    AuthModule,
    Usuario_permisosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
