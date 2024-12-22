import { Injectable } from '@nestjs/common';
import { InterfacePostSubject, InterfaceSubject } from './subject';
import { SUBJECT } from './bdd';

@Injectable()
export class SubjectService {
  findAll(): InterfaceSubject[] {
    return SUBJECT;
  }

  findOneByID(id: number): InterfaceSubject {
    const subject = SUBJECT.find((s) => s.id === id);
    return subject;
  }

  createNewSubject({ name }: InterfacePostSubject): InterfaceSubject[] {
    const sortedByIdSubject = SUBJECT.sort((a, b) => a.id + b.id);
    const newId = sortedByIdSubject[sortedByIdSubject.length - 1].id + 1;
    return [...SUBJECT, { id: newId, name, levelId: 1 }];
  }
}
