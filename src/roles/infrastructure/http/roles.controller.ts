import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateRoleUseCase }    from '../../application/use-cases/create-role.use-case';
import { FindAllRolesUseCase }  from '../../application/use-cases/find-all-roles.use-case';
import { FindOneRoleUseCase }   from '../../application/use-cases/find-one-role.use-case';
import { UpdateRoleUseCase }    from '../../application/use-cases/update-role.use-case';
import { RemoveRoleUseCase }    from '../../application/use-cases/remove-role.use-case';
import { CreateRoleDto }        from '../../application/dto/create-role.dto';
import { UpdateRoleDto }        from '../../application/dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly createRoleUseCase:   CreateRoleUseCase,
    private readonly findAllRolesUseCase: FindAllRolesUseCase,
    private readonly findOneRoleUseCase:  FindOneRoleUseCase,
    private readonly updateRoleUseCase:   UpdateRoleUseCase,
    private readonly removeRoleUseCase:   RemoveRoleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.createRoleUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllRolesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneRoleUseCase.execute(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateRoleDto) {
    return this.updateRoleUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeRoleUseCase.execute(id);
  }
}
