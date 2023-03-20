/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";


export class AlbumDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly caratula: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsDate()
    @IsNotEmpty()
    readonly fechaLanzamiento: Date;

    @IsNumber()
    @IsNotEmpty()
    readonly duracion: number;
}
