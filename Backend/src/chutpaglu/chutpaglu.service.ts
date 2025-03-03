import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChutPaglu, ChutPagluDocument } from './models/chutpaglu.schema';

@Injectable()
export class ChutpagluService {
  constructor(@InjectModel(ChutPaglu.name) private readonly chutPagluModel: Model<ChutPagluDocument>) { }

  async getMatch() {
    return this.chutPagluModel.aggregate([{ $sample: { size: 2 } }]);
  }

  async leaderboard() {
    return this.chutPagluModel.find().sort({ rank: 'desc' }).limit(10);
  }

  async saveWinner(_id: number) {
    return this.chutPagluModel.updateOne({ _id: _id }, { $inc: { rank: 1 } });
  }
}
