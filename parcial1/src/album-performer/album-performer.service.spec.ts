/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PerformerEntity } from '../performer/performer.entity';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumPerformerService } from './album-performer.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('AlbumPerformerService', () => {
  let service: AlbumPerformerService;
  let albumRepository: Repository<AlbumEntity>;
  let performerRepository: Repository<PerformerEntity>;
  let album: AlbumEntity;
  let performersList : PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumPerformerService],
    }).compile();

    service = module.get<AlbumPerformerService>(AlbumPerformerService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    performerRepository.clear();
    albumRepository.clear();

    performersList = [];
    for(let i = 0; i < 5; i++){
        const performer: PerformerEntity = await performerRepository.save({
          nombre: faker.name.firstName(),
          imagen: faker.image.imageUrl(),
          descripcion: faker.lorem.sentence()
        })
        performersList.push(performer);
    }

    album = await albumRepository.save({
      nombre: faker.name.firstName(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.sentence(),
      fechaLanzamiento: faker.date.past(),
      duracion: faker.datatype.number(),
      tracks: [],
      performers: []
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addPerformerToAlbum should add an performer to a album', async () => {
    const newPerformer: PerformerEntity = await performerRepository.save({
      nombre: faker.name.firstName(),
      imagen: faker.image.imageUrl(),
      descripcion: faker.lorem.sentence()
    });

    const newAlbum: AlbumEntity = await albumRepository.save({
      nombre: faker.name.firstName(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.sentence(),
      fechaLanzamiento: faker.date.past(),
      duracion: faker.datatype.number(),
      tracks: [],
      performers: []
    })

    const result: AlbumEntity = await service.addPerformerToAlbum(newAlbum.id, newPerformer.id);
    
    expect(result.performers.length).toBe(1);
    expect(result.performers[0]).not.toBeNull();
    expect(result.performers[0].nombre).toBe(newPerformer.nombre)
    expect(result.performers[0].imagen).toBe(newPerformer.imagen)
  });

  it('addPerformerToAlbum should thrown exception for an invalid performer', async () => {
    const newAlbum: AlbumEntity = await albumRepository.save({
      nombre: faker.name.firstName(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.sentence(),
      fechaLanzamiento: faker.date.past(),
      duracion: faker.datatype.number(),
      tracks: [],
      performers: []
    })

    await expect(() => service.addPerformerToAlbum(newAlbum.id, "0")).rejects.toHaveProperty("message", "The performer with the given id was not found");
  });

  it('addPerformerToAlbum should throw an exception for an invalid album', async () => {
    const newPerformer: PerformerEntity = await performerRepository.save({
      nombre: faker.name.firstName(),
      imagen: faker.image.imageUrl(),
      descripcion: faker.lorem.sentence()
    });
  });
});
