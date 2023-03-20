/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class PerformerDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly imagen: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;
}
