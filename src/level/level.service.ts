import { Injectable } from '@nestjs/common';
import { LevelSubjectInterface } from './level';
import { SubjectService } from 'src/subject/subject.service';
import { LEVELS } from './bdd';

@Injectable()
export class LevelService {
  constructor(private readonly subjectService: SubjectService) {}

  findLevelAndSubjetByName(name: string): LevelSubjectInterface[] {
    const level = LEVELS.find((l) => l.name === name);
    const subject = this.subjectService.findAll();
    const filteredSubjects = subject.filter((s) => s.levelId === level.id);

    return filteredSubjects.map<LevelSubjectInterface>((subject) => ({
      level,
      subject,
    }));
  }
}
