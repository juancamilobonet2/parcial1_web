/* eslint-disable prettier/prettier */
/* archivo: ../track/track.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { AlbumService } from '../album/album.service';
import { AlbumEntity } from '../album/album.entity';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>,

        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ) { }

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find({ relations: ["album"] });
    }

    async findOne(id: string): Promise<TrackEntity> {
        const track: TrackEntity = await this.trackRepository.findOne({ where: { id }, relations: ["album"] });
        if (!track)
            throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);

        return track;
    }

    async create(albumId: string, track: TrackEntity): Promise<TrackEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({ where: { id: albumId }, relations: ["tracks", "performers"] })

        if (!album)
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        if (track.duracion <= 0)
            throw new BusinessLogicException("The duration must be greater than 0", BusinessError.BAD_REQUEST); 

        return await this.trackRepository.save(track);
    }
}