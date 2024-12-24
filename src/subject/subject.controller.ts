import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InterfaceSubject, InterfacePostSubject } from './subject';
import { SubjectService } from './subject.service';
import { LevelSubjectInterface } from 'src/level/level';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll(): InterfaceSubject[] {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): InterfaceSubject {
    return this.subjectService.findOneByID(+id);
  }

  @Get(':name/level')
  findLevelAndSubject(@Param('name') name: string): LevelSubjectInterface[] {
    return this.subjectService.findLevelAndSubjectFromName(name);
  }

  @Post()
  addSubject(@Body() subject: InterfacePostSubject): InterfaceSubject[] {
    return this.subjectService.createNewSubject(subject);
  }
}
