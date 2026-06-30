import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoOrmEntity } from 'src/departamentos/infrastructure/persistence/departamento.orm-entity';
import { MunicipioOrmEntity }    from 'src/municipios/infrastructure/persistence/municipio.orm-entity';

const COLOMBIA: Array<{
  nombre: string; codigo: string;
  municipios: Array<{ nombre: string; codigo: string }>;
}> = [
  { nombre: 'Amazonas',          codigo: 'AMAZO-01', municipios: [{ nombre: 'Leticia', codigo: 'LETICIA-01' }, { nombre: 'Puerto Nariño', codigo: 'PNARINO-01' }] },
  { nombre: 'Antioquia',         codigo: 'ANTIO-01', municipios: [{ nombre: 'Medellín', codigo: 'MEDELLIN-01' }, { nombre: 'Bello', codigo: 'BELLO-01' }, { nombre: 'Itagüí', codigo: 'ITAGUI-01' }, { nombre: 'Envigado', codigo: 'ENVIGADO-01' }, { nombre: 'Rionegro', codigo: 'RIONEGRO-01' }] },
  { nombre: 'Arauca',            codigo: 'ARAUC-01', municipios: [{ nombre: 'Arauca', codigo: 'ARAUCA-01' }, { nombre: 'Saravena', codigo: 'SARAVENA-01' }] },
  { nombre: 'Atlántico',         codigo: 'ATLAN-01', municipios: [{ nombre: 'Barranquilla', codigo: 'BARRANQ-01' }, { nombre: 'Soledad', codigo: 'SOLEDAD-01' }, { nombre: 'Malambo', codigo: 'MALAMBO-01' }] },
  { nombre: 'Bolívar',           codigo: 'BOLIV-01', municipios: [{ nombre: 'Cartagena', codigo: 'CARTAGE-01' }, { nombre: 'Magangué', codigo: 'MAGANGUE-01' }, { nombre: 'Mompox', codigo: 'MOMPOX-01' }] },
  { nombre: 'Boyacá',            codigo: 'BOYAC-01', municipios: [{ nombre: 'Tunja', codigo: 'TUNJA-01' }, { nombre: 'Duitama', codigo: 'DUITAMA-01' }, { nombre: 'Sogamoso', codigo: 'SOGAMOSO-01' }] },
  { nombre: 'Caldas',            codigo: 'CALD-01',  municipios: [{ nombre: 'Manizales', codigo: 'MANIZAL-01' }, { nombre: 'La Dorada', codigo: 'LADORAD-01' }, { nombre: 'Chinchiná', codigo: 'CHINCHI-01' }] },
  { nombre: 'Caquetá',           codigo: 'CAQUE-01', municipios: [{ nombre: 'Florencia', codigo: 'FLOREN-01' }, { nombre: 'San Vicente del Caguán', codigo: 'SVICENT-01' }] },
  { nombre: 'Casanare',          codigo: 'CASAN-01', municipios: [{ nombre: 'Yopal', codigo: 'YOPAL-01' }, { nombre: 'Aguazul', codigo: 'AGUAZUL-01' }] },
  { nombre: 'Cauca',             codigo: 'CAUCA-01', municipios: [{ nombre: 'Popayán', codigo: 'POPAYAN-01' }, { nombre: 'Santander de Quilichao', codigo: 'SQUILI-01' }, { nombre: 'Puerto Tejada', codigo: 'PTEJAD-01' }] },
  { nombre: 'Cesar',             codigo: 'CESAR-01', municipios: [{ nombre: 'Valledupar', codigo: 'VALLEDU-01' }, { nombre: 'Aguachica', codigo: 'AGUACHI-01' }] },
  { nombre: 'Chocó',             codigo: 'CHOCO-01', municipios: [{ nombre: 'Quibdó', codigo: 'QUIBDO-01' }, { nombre: 'Istmina', codigo: 'ISTMINA-01' }] },
  { nombre: 'Córdoba',           codigo: 'CORDO-01', municipios: [{ nombre: 'Montería', codigo: 'MONTERI-01' }, { nombre: 'Lorica', codigo: 'LORICA-01' }, { nombre: 'Cereté', codigo: 'CERETE-01' }] },
  { nombre: 'Cundinamarca',      codigo: 'CUNDI-01', municipios: [{ nombre: 'Bogotá D.C.', codigo: 'BOG-001' }, { nombre: 'Soacha', codigo: 'SOACHA-01' }, { nombre: 'Facatativá', codigo: 'FACATA-01' }, { nombre: 'Zipaquirá', codigo: 'ZIPAQUI-01' }, { nombre: 'Fusagasugá', codigo: 'FUSAGA-01' }] },
  { nombre: 'Guainía',           codigo: 'GUAIN-01', municipios: [{ nombre: 'Inírida', codigo: 'INIRIDA-01' }] },
  { nombre: 'Guaviare',          codigo: 'GUAVI-01', municipios: [{ nombre: 'San José del Guaviare', codigo: 'SJGUA-01' }] },
  { nombre: 'Huila',             codigo: 'HUILA-01', municipios: [{ nombre: 'Neiva', codigo: 'NEIVA-01' }, { nombre: 'Pitalito', codigo: 'PITALI-01' }, { nombre: 'Garzón', codigo: 'GARZON-01' }, { nombre: 'La Plata', codigo: 'LAPLATA-01' }] },
  { nombre: 'La Guajira',        codigo: 'GUAJI-01', municipios: [{ nombre: 'Riohacha', codigo: 'RIOHA-01' }, { nombre: 'Maicao', codigo: 'MAICAO-01' }, { nombre: 'Uribia', codigo: 'URIBIA-01' }] },
  { nombre: 'Magdalena',         codigo: 'MAGDA-01', municipios: [{ nombre: 'Santa Marta', codigo: 'SMARTA-01' }, { nombre: 'Ciénaga', codigo: 'CIENAG-01' }, { nombre: 'Fundación', codigo: 'FUNDAC-01' }] },
  { nombre: 'Meta',              codigo: 'META-01',  municipios: [{ nombre: 'Villavicencio', codigo: 'VILLAV-01' }, { nombre: 'Acacías', codigo: 'ACACIAS-01' }, { nombre: 'Granada', codigo: 'GRANADA-01' }] },
  { nombre: 'Nariño',            codigo: 'NARIN-01', municipios: [{ nombre: 'Pasto', codigo: 'PASTO-01' }, { nombre: 'Tumaco', codigo: 'TUMACO-01' }, { nombre: 'Ipiales', codigo: 'IPIALES-01' }] },
  { nombre: 'Norte de Santander',codigo: 'NSTAN-01', municipios: [{ nombre: 'Cúcuta', codigo: 'CUCUTA-01' }, { nombre: 'Ocaña', codigo: 'OCANA-01' }, { nombre: 'Pamplona', codigo: 'PAMPLO-01' }] },
  { nombre: 'Putumayo',          codigo: 'PUTUM-01', municipios: [{ nombre: 'Mocoa', codigo: 'MOCOA-01' }, { nombre: 'Puerto Asís', codigo: 'PASIS-01' }] },
  { nombre: 'Quindío',           codigo: 'QUIND-01', municipios: [{ nombre: 'Armenia', codigo: 'ARMENI-01' }, { nombre: 'Calarcá', codigo: 'CALARCA-01' }, { nombre: 'Montenegro', codigo: 'MONTENE-01' }] },
  { nombre: 'Risaralda',         codigo: 'RISAR-01', municipios: [{ nombre: 'Pereira', codigo: 'PEREIRA-01' }, { nombre: 'Dosquebradas', codigo: 'DOSQUE-01' }, { nombre: 'Santa Rosa de Cabal', codigo: 'SROSAC-01' }] },
  { nombre: 'San Andrés y Providencia', codigo: 'SANDI-01', municipios: [{ nombre: 'San Andrés', codigo: 'SANDRES-01' }] },
  { nombre: 'Santander',         codigo: 'SANTA-01', municipios: [{ nombre: 'Bucaramanga', codigo: 'BUCARA-01' }, { nombre: 'Floridablanca', codigo: 'FLORID-01' }, { nombre: 'Girón', codigo: 'GIRON-01' }, { nombre: 'Piedecuesta', codigo: 'PIEDEC-01' }] },
  { nombre: 'Sucre',             codigo: 'SUCRE-01', municipios: [{ nombre: 'Sincelejo', codigo: 'SINCEL-01' }, { nombre: 'Corozal', codigo: 'COROZAL-01' }] },
  { nombre: 'Tolima',            codigo: 'TOLIM-01', municipios: [{ nombre: 'Ibagué', codigo: 'IBAGUE-01' }, { nombre: 'Espinal', codigo: 'ESPINAL-01' }, { nombre: 'Melgar', codigo: 'MELGAR-01' }] },
  { nombre: 'Valle del Cauca',   codigo: 'VALLE-01', municipios: [{ nombre: 'Cali', codigo: 'CALI-01' }, { nombre: 'Buenaventura', codigo: 'BUENAV-01' }, { nombre: 'Palmira', codigo: 'PALMIRA-01' }, { nombre: 'Tuluá', codigo: 'TULUA-01' }, { nombre: 'Buga', codigo: 'BUGA-01' }] },
  { nombre: 'Vaupés',            codigo: 'VAUPE-01', municipios: [{ nombre: 'Mitú', codigo: 'MITU-01' }] },
  { nombre: 'Vichada',           codigo: 'VICHA-01', municipios: [{ nombre: 'Puerto Carreño', codigo: 'PCARREN-01' }] },
];

@Injectable()
export class GeoSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(GeoSeederService.name);

  constructor(
    @InjectRepository(DepartamentoOrmEntity)
    private readonly deptoRepo: Repository<DepartamentoOrmEntity>,
    @InjectRepository(MunicipioOrmEntity)
    private readonly munRepo: Repository<MunicipioOrmEntity>,
  ) {}

  async onApplicationBootstrap() {
    const total = await this.deptoRepo.count();
    // Si ya hay 30+ departamentos, no re-seedear
    if (total >= 30) return;

    this.logger.log('Cargando departamentos y municipios de Colombia...');

    for (const dep of COLOMBIA) {
      let depto = await this.deptoRepo.findOne({ where: { codigo: dep.codigo } });
      if (!depto) {
        depto = await this.deptoRepo.save(
          this.deptoRepo.create({ nombre: dep.nombre, codigo: dep.codigo, estado: 'activo' as any }),
        );
      }

      for (const mun of dep.municipios) {
        const existe = await this.munRepo.findOne({ where: { codigo: mun.codigo } });
        if (!existe) {
          await this.munRepo.save(
            this.munRepo.create({
              nombre:       mun.nombre,
              codigo:       mun.codigo,
              estado:       'activo' as any,
              departamento: { id: depto.id } as any,
            }),
          );
        }
      }
    }

    this.logger.log(`✓ ${COLOMBIA.length} departamentos y sus municipios principales cargados.`);
  }
}
