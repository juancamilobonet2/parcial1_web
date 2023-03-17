/* eslint-disable prettier/prettier */
/* archivo: src/album/album.service.ts */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ) { }

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ["performers", "tracks"] });
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({ where: { id }, relations: ["performers", "tracks"] });
        if (!album)
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        return album;
    }

    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if (album.nombre == null || album.nombre == "")
            throw new BusinessLogicException("The album name is required", BusinessError.BAD_REQUEST);

        if (album.descripcion == null || album.descripcion == "")
            throw new BusinessLogicException("The album description is required", BusinessError.BAD_REQUEST);

        return await this.albumRepository.save(album);
    }

    async delete(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({ where: { id } });
        if (!album)
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);

        if (album.tracks.length > 0)
            throw new BusinessLogicException("The album has tracks associated", BusinessError.BAD_REQUEST);

        await this.albumRepository.remove(album);
    }
}