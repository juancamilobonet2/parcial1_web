/* eslint-disable prettier/prettier */
import { AlbumEntity } from 'src/album/album.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrackEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    duracion: number;

    @ManyToOne(() => AlbumEntity,album => album.tracks)
    album: AlbumEntity;

    // @OneToMany(() => ReserveEntity, reserva => reserva.usuario)
    // reservas: ReserveEntity[];

    // @OneToMany(() => TripEntity, viaje => viaje.conductor)
    // viajes: TripEntity[];
}