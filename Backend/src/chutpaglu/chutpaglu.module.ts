import { Module } from '@nestjs/common';
import { ChutpagluService } from './chutpaglu.service';
import { ChutpagluController } from './chutpaglu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ChutPaglu, ChutPagluSchema } from './models/chutpaglu.schema';
import { RateLimiterService } from './ratelimiting';
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
  ],
  controllers: [ChutpagluController],
  providers: [
    ChutpagluService,
    RateLimiterService
  ],
})
export class ChutpagluModule { }
