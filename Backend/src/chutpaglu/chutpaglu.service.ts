import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChutPaglu, ChutPagluDocument } from './models/chutpaglu.schema';

@Injectable()
export class ChutpagluService {
  constructor(@InjectModel(ChutPaglu.name) private readonly chutPagluModel: Model<ChutPagluDocument>) { }

  async getMatch() {
    return this.chutPagluModel.aggregate([{
      $match: {
        deleted: { $ne: true }
      }
    }, { $sample: { size: 2 } }]);
  }

  async leaderboard() {
    return this.chutPagluModel.find({
      deleted: { $ne: true }
    }).sort({ rank: 'desc' }).limit(10);
  }

  async saveWinner(_id: string) {
    return this.chutPagluModel.updateOne({ _id: _id }, { $inc: { rank: 1 } });
  }

  async deleteUser(_id: string) {
    return this.chutPagluModel.updateOne({ _id: _id }, { deleted: true });
  }
}
