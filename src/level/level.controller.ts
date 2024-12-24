import { LevelService } from './level.service';
import { Controller, Get, Param } from '@nestjs/common';
import { LevelInterface, LevelSubjectInterface } from './level';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get('/')
  findAll(): LevelInterface[] {
    return this.levelService.findAll();
  }

  @Get('/subject/:name')
  findLevelAndSubjetByName(
    @Param('name') name: string,
  ): LevelSubjectInterface[] {
    return this.levelService.findLevelAndSubjetByName(name);
  }
}
