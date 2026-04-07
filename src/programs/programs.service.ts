import { Injectable } from '@nestjs/common';
import { CreateProgramDto } from './application/dto/create-program.dto';
import { UpdateProgramDto } from './application/dto/update-program.dto';

@Injectable()
export class ProgramsService {
  create(createProgramDto: CreateProgramDto) {
    return 'This action adds a new program';
  }

  findAll() {
    return `This action returns all programs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} program`;
  }

  update(id: number, updateProgramDto: UpdateProgramDto) {
    return `This action updates a #${id} program`;
  }

  remove(id: number) {
    return `This action removes a #${id} program`;
  }
}
