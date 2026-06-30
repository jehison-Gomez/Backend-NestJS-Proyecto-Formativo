import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermisoOrmEntity } from 'src/permisos/infrastructure/persistence/permiso.orm-entity';
import { RoleOrmEntity } from 'src/roles/infrastructure/persistence/role.orm-entity';
import { Rol_permisoOrmEntity } from 'src/rol_permisos/infrastructure/persistence/rol_permiso.orm-entity';
import { UsuarioOrmEntity } from 'src/usuarios/infrastructure/persistence/usuario.orm-entity';
import { PermisoEstado } from 'src/permisos/domain/permiso-estado.enum';
import { RoleEstado } from 'src/roles/domain/role-estado.enum';
import { UsuarioEstado } from 'src/usuarios/domain/usuario-estado.enum';
import { TipoDocumento } from 'src/usuarios/domain/tipo-documento.enum';

const PERMISOS_DEF = [
  // Super Admin — estructura
  { nombre: 'Ver Centros',                modulo: 'centros',       accion: 'leer',            descripcion: 'Listar y consultar centros de formación' },
  { nombre: 'Crear Centro',               modulo: 'centros',       accion: 'crear',           descripcion: 'Registrar nuevos centros de formación' },
  { nombre: 'Editar Centro',              modulo: 'centros',       accion: 'actualizar',      descripcion: 'Modificar centros existentes' },
  { nombre: 'Eliminar Centro',            modulo: 'centros',       accion: 'eliminar',        descripcion: 'Eliminar centros del sistema' },
  { nombre: 'Ver Sedes',                  modulo: 'sedes',         accion: 'leer',            descripcion: 'Listar y consultar sedes' },
  { nombre: 'Crear Sede',                 modulo: 'sedes',         accion: 'crear',           descripcion: 'Registrar nuevas sedes' },
  { nombre: 'Editar Sede',               modulo: 'sedes',         accion: 'actualizar',      descripcion: 'Modificar sedes existentes' },
  { nombre: 'Eliminar Sede',              modulo: 'sedes',         accion: 'eliminar',        descripcion: 'Eliminar sedes del sistema' },
  // Dashboard
  { nombre: 'Ver Dashboard',              modulo: 'dashboard',     accion: 'leer',            descripcion: 'Acceder al panel principal con estadísticas e indicadores' },
  // Áreas
  { nombre: 'Ver Áreas',                  modulo: 'areas',         accion: 'leer',            descripcion: 'Listar y consultar áreas del sistema' },
  { nombre: 'Crear Área',                 modulo: 'areas',         accion: 'crear',           descripcion: 'Registrar nuevas áreas' },
  { nombre: 'Editar Área',                modulo: 'areas',         accion: 'actualizar',      descripcion: 'Modificar información de áreas existentes' },
  { nombre: 'Eliminar Área',              modulo: 'areas',         accion: 'eliminar',        descripcion: 'Eliminar áreas del sistema' },
  // Materiales
  { nombre: 'Ver Materiales',             modulo: 'materiales',    accion: 'leer',            descripcion: 'Listar y consultar materiales del inventario' },
  { nombre: 'Crear Material',             modulo: 'materiales',    accion: 'crear',           descripcion: 'Registrar nuevos materiales' },
  { nombre: 'Editar Material',            modulo: 'materiales',    accion: 'actualizar',      descripcion: 'Modificar información de materiales existentes' },
  { nombre: 'Eliminar Material',          modulo: 'materiales',    accion: 'eliminar',        descripcion: 'Eliminar materiales del sistema' },
  // Ubicaciones
  { nombre: 'Ver Ubicaciones',            modulo: 'ubicaciones',   accion: 'leer',            descripcion: 'Listar y consultar ubicaciones de almacenamiento' },
  { nombre: 'Crear Ubicación',            modulo: 'ubicaciones',   accion: 'crear',           descripcion: 'Registrar nuevas ubicaciones' },
  { nombre: 'Editar Ubicación',           modulo: 'ubicaciones',   accion: 'actualizar',      descripcion: 'Modificar ubicaciones existentes' },
  { nombre: 'Eliminar Ubicación',         modulo: 'ubicaciones',   accion: 'eliminar',        descripcion: 'Eliminar ubicaciones del sistema' },
  // Préstamos
  { nombre: 'Ver Préstamos',              modulo: 'prestamos',     accion: 'leer',            descripcion: 'Consultar solicitudes y préstamos de materiales' },
  { nombre: 'Crear Préstamo',             modulo: 'prestamos',     accion: 'crear',           descripcion: 'Solicitar nuevos préstamos de materiales' },
  { nombre: 'Aprobar Préstamo',           modulo: 'prestamos',     accion: 'aprobar',         descripcion: 'Aprobar solicitudes de préstamo pendientes' },
  { nombre: 'Rechazar Préstamo',          modulo: 'prestamos',     accion: 'rechazar',        descripcion: 'Rechazar solicitudes de préstamo' },
  { nombre: 'Registrar Devolución',       modulo: 'prestamos',     accion: 'devolver',        descripcion: 'Registrar la devolución de materiales prestados' },
  // Kardex
  { nombre: 'Ver Kardex',                 modulo: 'kardex',        accion: 'leer',            descripcion: 'Consultar el historial de movimientos del inventario' },
  // Movimientos
  { nombre: 'Ver Movimientos',            modulo: 'movimientos',   accion: 'leer',            descripcion: 'Listar movimientos de entrada y salida del inventario' },
  { nombre: 'Crear Movimiento',           modulo: 'movimientos',   accion: 'crear',           descripcion: 'Registrar nuevos movimientos de inventario' },
  // Fichas
  { nombre: 'Ver Fichas',                 modulo: 'fichas',        accion: 'leer',            descripcion: 'Listar y consultar fichas de formación' },
  { nombre: 'Crear Ficha',                modulo: 'fichas',        accion: 'crear',           descripcion: 'Registrar nuevas fichas de formación' },
  { nombre: 'Editar Ficha',               modulo: 'fichas',        accion: 'actualizar',      descripcion: 'Modificar información de fichas existentes' },
  { nombre: 'Eliminar Ficha',             modulo: 'fichas',        accion: 'eliminar',        descripcion: 'Eliminar fichas del sistema' },
  // Programas
  { nombre: 'Ver Programas',              modulo: 'programas',     accion: 'leer',            descripcion: 'Listar y consultar programas de formación' },
  { nombre: 'Crear Programa',             modulo: 'programas',     accion: 'crear',           descripcion: 'Registrar nuevos programas' },
  { nombre: 'Editar Programa',            modulo: 'programas',     accion: 'actualizar',      descripcion: 'Modificar programas existentes' },
  { nombre: 'Eliminar Programa',          modulo: 'programas',     accion: 'eliminar',        descripcion: 'Eliminar programas del sistema' },
  // Usuarios
  { nombre: 'Ver Usuarios',               modulo: 'usuarios',      accion: 'leer',            descripcion: 'Listar y consultar usuarios registrados' },
  { nombre: 'Crear Usuario',              modulo: 'usuarios',      accion: 'crear',           descripcion: 'Registrar nuevos usuarios en el sistema' },
  { nombre: 'Editar Usuario',             modulo: 'usuarios',      accion: 'actualizar',      descripcion: 'Modificar información de usuarios existentes' },
  { nombre: 'Eliminar Usuario',           modulo: 'usuarios',      accion: 'eliminar',        descripcion: 'Eliminar usuarios del sistema' },
  { nombre: 'Asignar Rol',                modulo: 'usuarios',      accion: 'asignar_rol',     descripcion: 'Asignar roles a usuarios del sistema' },
  { nombre: 'Asignar Permisos',           modulo: 'usuarios',      accion: 'asignar_permisos',descripcion: 'Asignar permisos adicionales a usuarios' },
  // Roles
  { nombre: 'Ver Roles',                  modulo: 'roles',         accion: 'leer',            descripcion: 'Listar y consultar roles del sistema' },
  { nombre: 'Crear Rol',                  modulo: 'roles',         accion: 'crear',           descripcion: 'Crear nuevos roles en el sistema' },
  { nombre: 'Editar Rol',                 modulo: 'roles',         accion: 'actualizar',      descripcion: 'Modificar roles existentes' },
  { nombre: 'Eliminar Rol',               modulo: 'roles',         accion: 'eliminar',        descripcion: 'Eliminar roles del sistema' },
  // Configuración (categorías, tipos ubicación, permisos)
  { nombre: 'Ver Configuración',          modulo: 'configuracion', accion: 'leer',            descripcion: 'Acceder a la configuración del sistema' },
  { nombre: 'Crear en Configuración',     modulo: 'configuracion', accion: 'crear',           descripcion: 'Crear elementos de configuración (categorías, tipos, permisos)' },
  { nombre: 'Editar Configuración',       modulo: 'configuracion', accion: 'actualizar',      descripcion: 'Modificar elementos de configuración del sistema' },
  { nombre: 'Eliminar Configuración',     modulo: 'configuracion', accion: 'eliminar',        descripcion: 'Eliminar elementos de configuración del sistema' },
  // Reportes
  { nombre: 'Ver Reportes',               modulo: 'reportes',      accion: 'leer',            descripcion: 'Acceder y generar reportes del sistema' },
];

const TODOS = PERMISOS_DEF.map(p => p.nombre);

const PERMISOS_POR_ROL: Record<string, string[]> = {
  super_admin: [
    'Ver Centros', 'Crear Centro', 'Editar Centro', 'Eliminar Centro',
    'Ver Sedes',   'Crear Sede',   'Editar Sede',   'Eliminar Sede',
    'Ver Usuarios', 'Crear Usuario', 'Editar Usuario',
  ],

  administrador: TODOS,

  instructor_encargado: [
    'Ver Dashboard',
    'Ver Áreas',
    'Ver Materiales', 'Crear Material', 'Editar Material',
    'Ver Ubicaciones', 'Crear Ubicación', 'Editar Ubicación',
    'Ver Préstamos', 'Crear Préstamo', 'Aprobar Préstamo', 'Rechazar Préstamo', 'Registrar Devolución',
    'Ver Kardex',
    'Ver Movimientos', 'Crear Movimiento',
    'Ver Fichas', 'Crear Ficha', 'Editar Ficha',
    'Ver Programas',
    'Ver Configuración',
    'Ver Reportes',
  ],

  instructor: [
    'Ver Dashboard',
    'Ver Materiales',
    'Ver Préstamos', 'Crear Préstamo',
    'Ver Fichas',
    'Ver Programas',
    'Ver Reportes',
  ],

  vocero: [
    'Ver Préstamos', 'Crear Préstamo',
  ],

  aprendiz: [
    'Ver Préstamos',
  ],
};

const ROLES_DEF = [
  { nombre: 'super_admin',          descripcion: 'Gestión de centros, sedes y administradores',     nivelAcceso: 999 },
  { nombre: 'administrador',        descripcion: 'Acceso completo al sistema por sede',             nivelAcceso: 100 },
  { nombre: 'instructor_encargado', descripcion: 'Gestión de área, materiales y préstamos',         nivelAcceso: 70  },
  { nombre: 'instructor',           descripcion: 'Gestión de fichas y solicitud de préstamos',      nivelAcceso: 50  },
  { nombre: 'vocero',               descripcion: 'Solicitar préstamos en nombre del grupo',         nivelAcceso: 30  },
  { nombre: 'aprendiz',             descripcion: 'Consulta de préstamos y asignaciones',            nivelAcceso: 10  },
];

@Injectable()
export class PermissionsSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(PermissionsSeederService.name);

  constructor(
    @InjectRepository(PermisoOrmEntity)
    private readonly permisoRepo: Repository<PermisoOrmEntity>,
    @InjectRepository(RoleOrmEntity)
    private readonly roleRepo: Repository<RoleOrmEntity>,
    @InjectRepository(Rol_permisoOrmEntity)
    private readonly rolPermisoRepo: Repository<Rol_permisoOrmEntity>,
    @InjectRepository(UsuarioOrmEntity)
    private readonly usuarioRepo: Repository<UsuarioOrmEntity>,
  ) {}

  async onApplicationBootstrap() {
    const sentinel = await this.permisoRepo.findOne({ where: { nombre: 'Ver Dashboard' } });
    if (!sentinel) {
      await this.seed(); // seed() ya incluye seedAdminPorDefecto al final
    } else {
      this.logger.log('Permisos ya inicializados — verificando roles y usuarios...');
      await this.seedRolesFaltantes();
      await this.seedAdminPorDefecto();
    }
  }

  private async seedRolesFaltantes() {
    for (const rolDef of ROLES_DEF) {
      const existe = await this.roleRepo.findOne({ where: { nombre: rolDef.nombre } });
      if (!existe) {
        await this.roleRepo.save(
          this.roleRepo.create({
            nombre:      rolDef.nombre,
            descripcion: rolDef.descripcion,
            nivelAcceso: rolDef.nivelAcceso,
            estado:      RoleEstado.ACTIVO,
          }),
        );
        this.logger.log(`Rol faltante creado: ${rolDef.nombre}`);
      }
    }
  }

  private async seed() {
    this.logger.log('Iniciando seeder de permisos y roles...');

    // 1. Crear todos los permisos
    const mapa = new Map<string, PermisoOrmEntity>();
    for (const def of PERMISOS_DEF) {
      const saved = await this.permisoRepo.save(
        this.permisoRepo.create({
          nombre:      def.nombre,
          modulo:      def.modulo,
          accion:      def.accion,
          descripcion: def.descripcion,
          estado:      PermisoEstado.ACTIVO,
        }),
      );
      mapa.set(def.nombre, saved);
    }
    this.logger.log(`${mapa.size} permisos creados`);

    // 2. Crear/encontrar roles y asignar permisos
    for (const rolDef of ROLES_DEF) {
      let role = await this.roleRepo.findOne({ where: { nombre: rolDef.nombre } });
      if (!role) {
        role = await this.roleRepo.save(
          this.roleRepo.create({
            nombre:      rolDef.nombre,
            descripcion: rolDef.descripcion,
            nivelAcceso: rolDef.nivelAcceso,
            estado:      RoleEstado.ACTIVO,
          }),
        );
        this.logger.log(`Rol creado: ${rolDef.nombre}`);
      }

      const permisosDelRol = (PERMISOS_POR_ROL[rolDef.nombre] ?? [])
        .map(n => mapa.get(n))
        .filter((p): p is PermisoOrmEntity => !!p);

      for (const permiso of permisosDelRol) {
        const existe = await this.rolPermisoRepo.findOne({
          where: { role: { id: role.id }, permiso: { id: permiso.id } },
        });
        if (!existe) {
          await this.rolPermisoRepo.save(
            this.rolPermisoRepo.create({
              role:    { id: role.id }    as any,
              permiso: { id: permiso.id } as any,
            }),
          );
        }
      }
      this.logger.log(`Rol "${rolDef.nombre}": ${permisosDelRol.length} permisos asignados`);
    }

    this.logger.log('Seeder completado exitosamente ✓');

    // 3. Crear admin por defecto si no hay ningún usuario
    await this.seedAdminPorDefecto();
  }

  private async seedAdminPorDefecto() {
    const rolSuperAdmin = await this.roleRepo.findOne({ where: { nombre: 'super_admin' } });

    // Crear Super Admin si no existe
    const superAdminExiste = await this.usuarioRepo.findOne({ where: { correo: 'SuperAdmin@sena.co' } });
    if (rolSuperAdmin && !superAdminExiste) {
      await this.usuarioRepo.save(
        this.usuarioRepo.create({
          nombre:          'Super Administrador',
          correo:          'SuperAdmin@sena.co',
          contrasena:      'Super1234',
          telefono:        '3000000000',
          numeroDocumento: '1000000000',
          tipoDocumento:   TipoDocumento.CC,
          estado:          UsuarioEstado.ACTIVO,
          role:            rolSuperAdmin,
        }),
      );
      this.logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      this.logger.log('  SUPER ADMIN CREADO');
      this.logger.log('  Correo:     SuperAdmin@sena.co');
      this.logger.log('  Contraseña: Super1234');
      this.logger.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }

  }
}
