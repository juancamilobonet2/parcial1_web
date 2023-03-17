/* eslint-disable prettier/prettier */
import { AlbumEntity } from 'src/album/album.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PerformerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    nombre: string;

    @Column()
    imagen: string;

    @Column()
    descripcion: string;

    @ManyToMany(() => AlbumEntity, album => album.performers)
    albums: AlbumEntity[];


    // @OneToMany(() => CarEntity, carro => carro.propietario)
    // carros: CarEntity[];

    // @OneToMany(() => ReserveEntity, reserva => reserva.usuario)
    // reservas: ReserveEntity[];

    // @OneToMany(() => TripEntity, viaje => viaje.conductor)
    // viajes: TripEntity[];   
}
