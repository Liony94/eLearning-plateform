import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LevelInterface, LevelSubjectInterface } from './level';
import { SubjectService } from 'src/subject/subject.service';
import { BddService } from 'src/bdd/bdd.service';

@Injectable()
export class LevelService {
  constructor(
    @Inject(forwardRef(() => SubjectService))
    private readonly subjectService: SubjectService,
    private bdd: BddService,
  ) {}

  findAll() {
    return this.bdd.get<LevelInterface>('levels');
  }

  findLevelAndSubjetByName(name: string): LevelSubjectInterface[] {
    const level = this.bdd
      .get<LevelInterface>('levels')
      .find((l) => l.name === name);
    const subject = this.subjectService.findAll();
    const filteredSubjects = subject
      .filter((s) => s.levelId === level.id)
      .map((subject) => ({
        subject,
        level,
      }));

    return filteredSubjects;
  }
}
