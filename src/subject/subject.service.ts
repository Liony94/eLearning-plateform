import { Inject, Injectable } from '@nestjs/common';
import { InterfacePostSubject, InterfaceSubject } from './subject';
import { BddService } from 'src/bdd/bdd.service';
import { LevelInterface, LevelSubjectInterface } from 'src/level/level';
import { TOKEN_LEVELS } from 'src/bdd/constante';
import { ConfigService } from './../config/config.service';

@Injectable()
export class SubjectService {
  constructor(
    private bdd: BddService,
    @Inject(TOKEN_LEVELS) private bddLevels: LevelInterface[],
    private configService: ConfigService,
  ) {
    console.log('SubjectService construit avec configService:', configService);
  }

  findAll(): InterfaceSubject[] {
    return this.bdd.get<InterfaceSubject>('subjects');
  }

  findOneByID(id: number): InterfaceSubject {
    return this.bdd.getById<InterfaceSubject>('subjects', id);
  }

  findLevelAndSubjectFromName(name: string): LevelSubjectInterface[] {
    const subject = this.findAll().find((s) => s.name === name);
    const levels = this.bddLevels;
    const filteredLevel = levels
      .filter((l) => l.id === subject.levelId)
      .map((level) => ({
        level,
        subject,
      }));

    return filteredLevel;
  }

  findFavoriteSubject(): string {
    console.log('findFavoriteSubject appelé');
    console.log('configService:', this.configService);
    try {
      const result = this.configService.get('FAVORITE_SUBJECT');
      console.log('Valeur de FAVORITE_SUBJECT:', result);
      return result;
    } catch (error) {
      console.error('Erreur dans findFavoriteSubject:', error);
      throw error;
    }
  }

  createNewSubject({ name }: InterfacePostSubject): InterfaceSubject[] {
    const sortedByIdSubject = this.findAll().sort((a, b) => a.id + b.id);
    const newId = sortedByIdSubject[sortedByIdSubject.length - 1].id + 1;
    return [...this.findAll(), { id: newId, name, levelId: 1 }];
  }
}
