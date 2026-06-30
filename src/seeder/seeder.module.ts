import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsSeederService } from './permissions-seeder.service';
import { GeoSeederService }         from './geo-seeder.service';
import { PermisoOrmEntity }         from 'src/permisos/infrastructure/persistence/permiso.orm-entity';
import { RoleOrmEntity }            from 'src/roles/infrastructure/persistence/role.orm-entity';
import { Rol_permisoOrmEntity }     from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';
import { UsuarioOrmEntity }         from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { DepartamentoOrmEntity }    from 'src/departamentos/infrastructure/persistence/departamento.orm-entity';
import { MunicipioOrmEntity }       from 'src/municipios/infrastructure/persistence/municipio.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermisoOrmEntity,
      RoleOrmEntity,
      Rol_permisoOrmEntity,
      UsuarioOrmEntity,
      DepartamentoOrmEntity,
      MunicipioOrmEntity,
    ]),
  ],
  providers: [PermissionsSeederService, GeoSeederService],
})
export class SeederModule {}
