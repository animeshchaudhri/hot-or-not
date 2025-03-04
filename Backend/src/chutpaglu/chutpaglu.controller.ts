import { Controller, Get, Post, Body, UseGuards, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { ChutpagluService } from './chutpaglu.service';
import { BrowserCheckGuard } from '../common/guards/browser-check.guard';
import { RateLimiterService } from './ratelimiting';

@Controller()
// @UseGuards(BrowserCheckGuard)
export class ChutpagluController {
  constructor(private readonly chutpagluService: ChutpagluService,
    private readonly rateLimiterService: RateLimiterService
  ) {}
  
  @Post('random-chutpaglu-match')
  saveWinner(@Body('_id') _id: string) {
    console.log("hit");
    
     if (!this.rateLimiterService.canProceed(_id, 20, 5)) {
          console.log("gae");

          throw new HttpException('Rate limit exceeded for this ID', HttpStatus.TOO_MANY_REQUESTS);
        }
        
    return this.chutpagluService.saveWinner(_id);
  }

  @Delete('chutpaglu')
  deleteUser(@Body('_id') _id: string) {
    console.log("delete hit");
        
    return this.chutpagluService.deleteUser(_id);
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