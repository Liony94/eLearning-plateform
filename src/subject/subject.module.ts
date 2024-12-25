import { forwardRef, Module } from '@nestjs/common';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { LevelModule } from 'src/level/level.module';
import { ConfigModule } from 'src/config/config.module';

@Module({
  exports: [SubjectService],
  controllers: [SubjectController],
  providers: [SubjectService],
  imports: [forwardRef(() => LevelModule), ConfigModule],
})
export class SubjectModule {}
