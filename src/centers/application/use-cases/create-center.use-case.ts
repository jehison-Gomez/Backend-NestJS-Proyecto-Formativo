import { Inject, Injectable } from '@nestjs/common';
import type { CenterRepository } from 'src/centers/domain/center.repository';
import { CreateCenterDto } from '../dto/create-center.dto';
import { Center } from 'src/centers/domain/center.entity';
import { handleDBErrors } from '../handle-db-errors';
import { CENTER_REPOSITORY } from 'src/centers/domain/center.repository';

@Injectable()
export class CreateCenterUseCase {
  constructor(
    @Inject(CENTER_REPOSITORY)
    private readonly repo: CenterRepository,
  ) {}

  async execute(dto: CreateCenterDto): Promise<Center> {
    const center = new Center();
    center.name = dto.name;
    center.center_code = dto.center_code;
    center.address = dto.address;
    center.department_id = dto.department_id;

    try {
      return await this.repo.save(center);
    } catch (error) {
      handleDBErrors(error);
    }
  }
}
