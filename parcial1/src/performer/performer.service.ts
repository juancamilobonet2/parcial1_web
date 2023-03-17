import { Injectable } from '@nestjs/common';
import { PerformerEntity } from './performer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';

@Injectable()
export class PerformerService {

    constructor(
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>
    ) { }

    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerRepository.find({ relations: ["performers", "performers"] });
    }

    async findOne(id: string): Promise<PerformerEntity> {
        const performer: PerformerEntity = await this.performerRepository.findOne({ where: { id }, relations: ["performers", "performers"] });
        if (!performer)
            throw new BusinessLogicException("The performer with the given id was not found", BusinessError.NOT_FOUND);

        return performer;
    }

    async create(albumId: string, performer: PerformerEntity): Promise<PerformerEntity> {
        if (performer.descripcion.length > 100)
            throw new BusinessLogicException("The description must be less than 100 characters", BusinessError.BAD_REQUEST);

        return await this.performerRepository.save(performer);
    }
}
