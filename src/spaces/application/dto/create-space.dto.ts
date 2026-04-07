import { IsEnum, IsString, MinLength } from "class-validator";
import { SpaceType } from "src/spaces/domain/enum";

export class CreateSpaceDto {

    @IsString({ message: 'El nombre debe ser un texto' })
    @MinLength(2, {message: 'El nombre debe tener al menos 2 caracteres' })
    name: string;

    @IsEnum(SpaceType, { message: `El tipo debe ser uno de los siguientes: ${Object.values(SpaceType).join(', ')}` })
    type: SpaceType;
}
