/* eslint-disable prettier/prettier */
import { PerformerEntity } from '../performer/performer.entity';
import { TrackEntity } from '../track/track.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AlbumEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    caratula: string;

    @Column()
    descripcion: string;

    @Column()
    fechaLanzamiento: Date;

    @Column()
    duracion: number;

    @OneToMany(() => TrackEntity, track => track.album)
    tracks: TrackEntity[];

    @ManyToMany(() => PerformerEntity, performer => performer.albums)
    @JoinTable()
    performers: PerformerEntity[];

    // @OneToMany(() => ReserveEntity, reserva => reserva.usuario)
    // reservas: ReserveEntity[];

    // @OneToMany(() => TripEntity, viaje => viaje.conductor)
    // viajes: TripEntity[];
}
