import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateUsuarioDto } from "src/usuarios/application/dto/create-usuario.dto";
import { UpdateUsuarioDto } from "src/usuarios/application/dto/update-usuario.dto";
import { CreateUsuarioUseCase } from "src/usuarios/application/use-cases/create-usuario.use-case";
import { FindAllUsuariosUseCase } from "src/usuarios/application/use-cases/find-all-usuarios.use-case";
import { FindOneUsuarioUseCase } from "src/usuarios/application/use-cases/find-one-usuario.use-case";
import { RemoveUsuarioUseCase } from "src/usuarios/application/use-cases/remove-usuario.use-case";
import { UpdateUsuarioUseCase } from "src/usuarios/application/use-cases/update-usuario.use-case";

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly createUseCase: CreateUsuarioUseCase,
    private readonly findAllUseCase: FindAllUsuariosUseCase,
    private readonly findOneUseCase: FindOneUsuarioUseCase,
    private readonly updateUseCase: UpdateUsuarioUseCase,
    private readonly removeUseCase: RemoveUsuarioUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  findAll() {
    return this.findAllUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.findOneUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUsuarioDto,
  ) {
    return this.updateUseCase.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.removeUseCase.execute(id);
  }
}