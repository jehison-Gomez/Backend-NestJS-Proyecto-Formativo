import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRepository } from '../../domain/usuario.repository';
import { Rol_permisoOrmEntity } from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';
import { Usuario_permisoOrmEntity } from 'src/usuario_permisos/infrastructure/persistence/usuario_permiso.orm-entity';

export interface PermisoConOrigen {
  id: string;
  nombre: string;
  modulo: string;
  accion: string;
  descripcion: string;
  origen: 'rol' | 'adicional';
}

@Injectable()
export class CalculateUserPermissionsUseCase {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    @InjectRepository(Rol_permisoOrmEntity)
    private readonly rolPermisoRepo: Repository<Rol_permisoOrmEntity>,
    @InjectRepository(Usuario_permisoOrmEntity)
    private readonly usuarioPermisoRepo: Repository<Usuario_permisoOrmEntity>,
  ) {}

  async execute(usuarioId: string): Promise<PermisoConOrigen[]> {
    const usuario = await this.usuarioRepository.findOne(usuarioId);
    if (!usuario) throw new NotFoundException(`Usuario #${usuarioId} no encontrado`);

    const rolPermisos = usuario.role?.id
      ? await this.rolPermisoRepo.find({
          where: { role: { id: usuario.role.id } },
          relations: ['permiso'],
        })
      : [];

    const usuarioPermisos = await this.usuarioPermisoRepo.find({
      where: { usuario: { id: usuarioId } },
      relations: ['permiso'],
    });

    const rolIds = new Set(rolPermisos.map((rp) => rp.permiso?.id).filter(Boolean));

    return [
      ...rolPermisos
        .filter((rp) => rp.permiso)
        .map((rp) => ({
          id:          rp.permiso.id,
          nombre:      rp.permiso.nombre,
          modulo:      rp.permiso.modulo,
          accion:      rp.permiso.accion,
          descripcion: rp.permiso.descripcion,
          origen:      'rol' as const,
        })),
      ...usuarioPermisos
        .filter((up) => up.permiso && !rolIds.has(up.permiso.id))
        .map((up) => ({
          id:          up.permiso.id,
          nombre:      up.permiso.nombre,
          modulo:      up.permiso.modulo,
          accion:      up.permiso.accion,
          descripcion: up.permiso.descripcion,
          origen:      'adicional' as const,
        })),
    ];
  }
}
