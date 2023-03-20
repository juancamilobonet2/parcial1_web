import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { PerformerModule } from './performer/performer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumPerformerService } from './album-performer/album-performer.service';
import { AlbumPerformerModule } from './album-performer/album-performer.module';
import { AlbumEntity } from './album/album.entity';
import { TrackEntity } from './track/track.entity';
import { PerformerEntity } from './performer/performer.entity';

@Module({
  imports: [AlbumModule, TrackModule, PerformerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcial1',
      entities: [AlbumEntity, TrackEntity, PerformerEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    AlbumPerformerModule,
  ],
  controllers: [AppController],
  providers: [AppService], //, AlbumPerformerService
})
export class AppModule {}
