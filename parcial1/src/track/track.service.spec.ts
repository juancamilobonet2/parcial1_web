/* eslint-disable prettier/prettier */
/*archivo src/track/track.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config'; 
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';
import { faker } from '@faker-js/faker';
import { AlbumEntity } from '../album/album.entity';

describe('TrackService', () => {
    let service: TrackService;
    let repository: Repository<TrackEntity>;
    let album_repo: Repository<AlbumEntity>;
    let tracksList: TrackEntity[];
    let album: AlbumEntity;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [TrackService],
        }).compile();

        service = module.get<TrackService>(TrackService);
        repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
        album_repo = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
        await seedDatabase();
    });
  
    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    const seedDatabase = async () => {
        repository.clear();
        tracksList = [];
        for(let i = 0; i < 5; i++){
            const track: TrackEntity = await repository.save({
            nombre: faker.name.firstName(),
            duracion: faker.datatype.number(),
            });
            tracksList.push(track);
        }

        album_repo.clear();
        album = await album_repo.save({
          nombre: faker.name.firstName(),
          caratula: faker.image.imageUrl(),
          descripcion: faker.lorem.sentence(),
          fechaLanzamiento: faker.date.past(),
          duracion: faker.datatype.number(),
          tracks: [],
          performers: []
        });


    }

    it('findAll should return all tracks', async () => {
        const tracks: TrackEntity[] = await service.findAll();
        expect(tracks).not.toBeNull();
        expect(tracks).toHaveLength(tracksList.length);
    });

    it('findOne should return a track by id', async () => {
        const storedTrack: TrackEntity = tracksList[0];
        const track: TrackEntity = await service.findOne(storedTrack.id);
        expect(track).not.toBeNull();
        expect(track.nombre).toEqual(storedTrack.nombre);
    });

    it('findOne should throw an exception for an invalid track', async () => {
        await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The track with the given id was not found")
    });

    it('create should return a new track', async () => {
        const track: TrackEntity = {
            id: "",
            nombre: faker.name.firstName(),
            duracion: faker.datatype.number(),
            album: null,
        }

        const newTrack: TrackEntity = await service.create(album.id, track);
        expect(newTrack).not.toBeNull();

        const storedTrack: TrackEntity = await repository.findOne({where: {id: newTrack.id}})
        expect(storedTrack).not.toBeNull();
        expect(storedTrack.nombre).toEqual(newTrack.nombre);
    });

});

/*archivo src/track/track.service.spec.ts*/