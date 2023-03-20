/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from '../../track/track.entity';
import { PerformerEntity } from '../../performer/performer.entity';
import { AlbumEntity } from '../../album/album.entity';

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [PerformerEntity,  TrackEntity, AlbumEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([PerformerEntity, TrackEntity, AlbumEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/