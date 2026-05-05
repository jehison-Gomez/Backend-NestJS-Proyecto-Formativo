import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Usuario } from "src/usuarios/domain/usuario.entity";
import { UsuarioRepository } from "src/usuarios/domain/usuario.repository";
import { UsuarioOrmEntity } from "./usuario.orm-entity";
import { FichaOrmEntity } from "src/fichas/infrastructure/persistence/ficha.orm-entity";
import { RolOrmEntity } from "src/rol/infrastructure/persistence/rol.orm-entity";

const RELATIONS = ['ficha', 'rol'];

@Injectable()
export class TypeOrmUsuarioRepository implements UsuarioRepository {
  constructor(
    @InjectRepository(UsuarioOrmEntity)
    private readonly repo: Repository<UsuarioOrmEntity>,
  ) {}

  private toDomain(orm: UsuarioOrmEntity): Usuario {
    return new Usuario({
      id_usuario: orm.id_usuario,
      nombre: orm.nombre,
      correo: orm.correo,
      contrasena: orm.contrasena,
      telefono: orm.telefono,
      documento: orm.documento,
      estado: orm.estado,
      fecha_registro: orm.fecha_registro,
      ultimo_acceso: orm.ultimo_acceso,
      id_ficha: orm.ficha?.id_ficha,
      id_rol: orm.rol?.id_rol,
    });
  }

  private toOrm(usuario: Partial<Usuario>): Partial<UsuarioOrmEntity> {
    return {
      ...(usuario.nombre !== undefined && { nombre: usuario.nombre }),
      ...(usuario.correo !== undefined && { correo: usuario.correo }),
      ...(usuario.contrasena !== undefined && { contrasena: usuario.contrasena }),
      ...(usuario.telefono !== undefined && { telefono: usuario.telefono }),
      ...(usuario.documento !== undefined && { documento: usuario.documento }),
      ...(usuario.estado !== undefined && { estado: usuario.estado }),
      ...(usuario.fecha_registro !== undefined && { fecha_registro: usuario.fecha_registro }),
      ...(usuario.ultimo_acceso !== undefined && { ultimo_acceso: usuario.ultimo_acceso }),
      ...(usuario.id_ficha !== undefined && { ficha: { id_ficha: usuario.id_ficha } as FichaOrmEntity }),
      ...(usuario.id_rol !== undefined && { rol: { id_rol: usuario.id_rol } as RolOrmEntity }),
    };
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const ormEntity = this.repo.create(this.toOrm(usuario));
    const saved = await this.repo.save(ormEntity);
    const reloaded = await this.repo.findOne({ where: { id_usuario: saved.id_usuario }, relations: RELATIONS });
    return this.toDomain(reloaded!);
  }

  async findAll(): Promise<Usuario[]> {
    const list = await this.repo.find({ relations: RELATIONS });
    return list.map(this.toDomain.bind(this));
  }

  async findOne(id: string): Promise<Usuario | null> {
    const found = await this.repo.findOne({ where: { id_usuario: id }, relations: RELATIONS });
    return found ? this.toDomain(found) : null;
  }

  async update(id: string, usuario: Partial<Usuario>): Promise<Usuario> {
    const existing = await this.repo.findOne({ where: { id_usuario: id }, relations: RELATIONS });
    if (!existing) throw new NotFoundException(`Usuario #${id} no encontrado`);
    Object.assign(existing, this.toOrm(usuario));
    const saved = await this.repo.save(existing);
    return this.toDomain(saved);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.repo.findOneBy({ id_usuario: id });
    if (!existing) throw new NotFoundException(`Usuario #${id} no encontrado`);
    await this.repo.delete(id);
  }
}
