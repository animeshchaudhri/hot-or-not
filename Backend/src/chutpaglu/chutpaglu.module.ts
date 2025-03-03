import { Module } from '@nestjs/common';
import { ChutpagluService } from './chutpaglu.service';
import { ChutpagluController } from './chutpaglu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ChutPaglu, ChutPagluSchema } from './models/chutpaglu.schema';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),
    MongooseModule.forFeature([{
      name: ChutPaglu.name,
      schema: ChutPagluSchema
    }]),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
  ],
  controllers: [ChutpagluController],
  providers: [
    ChutpagluService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ChutpagluModule { }
