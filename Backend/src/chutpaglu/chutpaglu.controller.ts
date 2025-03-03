import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChutpagluService } from './chutpaglu.service';

@Controller()
export class ChutpagluController {
  constructor(private readonly chutpagluService: ChutpagluService) {}

  @Post('random-chutpaglu-match')
  saveWinner(@Body('_id') _id: number) {
    return this.chutpagluService.saveWinner(_id);
  }

  @Get('random-chutpaglu-match')
  getMatch() {
    return this.chutpagluService.getMatch();
  }

  @Get('leaderboard')
  leaderboard() {
    return this.chutpagluService.leaderboard();
  }
}