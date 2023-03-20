/* eslint-disable prettier/prettier */
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class TrackDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNumber()
    @IsNotEmpty()
    readonly duracion: number;

    @IsString()
    @IsNotEmpty()
    readonly album: string;
}
