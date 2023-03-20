/* eslint-disable prettier/prettier */
/*archivo src/performer/performer.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config'; 
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';
import { faker } from '@faker-js/faker';

describe('PerformerService', () => {
    let service: PerformerService;
    let repository: Repository<PerformerEntity>;
    let performersList: PerformerEntity[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [PerformerService],
        }).compile();

        service = module.get<PerformerService>(PerformerService);
        repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
        await seedDatabase();
    });
  
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    const seedDatabase = async () => {
        repository.clear();
        performersList = [];
        for(let i = 0; i < 5; i++){
            const performer: PerformerEntity = await repository.save({
            nombre: faker.name.firstName(),
            imagen: faker.image.imageUrl(),
            descripcion: faker.lorem.sentence()
            });
            performersList.push(performer);
        }
    }

    it('findAll should return all performers', async () => {
        const performers: PerformerEntity[] = await service.findAll();
        expect(performers).not.toBeNull();
        expect(performers).toHaveLength(performersList.length);
    });

    it('findOne should return a performer by id', async () => {
        const storedPerformer: PerformerEntity = performersList[0];
        const performer: PerformerEntity = await service.findOne(storedPerformer.id);
        expect(performer).not.toBeNull();
        expect(performer.nombre).toEqual(storedPerformer.nombre);
    });

    it('findOne should throw an exception for an invalid performer', async () => {
        await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The performer with the given id was not found")
    });

    it('create should return a new performer', async () => {
        const performer: PerformerEntity = {
            id: "",
            nombre: faker.name.firstName(),
            imagen: faker.image.imageUrl(),
            descripcion: faker.lorem.sentence(),
            albums:[]
        }

        const newPerformer: PerformerEntity = await service.create(performer);
        expect(newPerformer).not.toBeNull();

        const storedPerformer: PerformerEntity = await repository.findOne({where: {id: newPerformer.id}})
        expect(storedPerformer).not.toBeNull();
        expect(storedPerformer.nombre).toEqual(newPerformer.nombre);
    });

});

/*archivo src/performer/performer.service.spec.ts*/