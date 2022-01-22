import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from '../category/infra/typeorm/entities/Category';
import ExamController from './infra/http/exam.controller';
import Exam from './infra/typeorm/entities/Exam';
import ActivateExamService from './services/activateExam.service';
import CreateExamService from './services/createExam.service';
import DeleteExamService from './services/deleteExam.service';
import DisableExamService from './services/disableExam.service';
import ListExamsIsActive from './services/listExamsIsActive.service';
import ListExamsNotActive from './services/listExamsNotActive.service';
import UpdateExamService from './services/updateExam.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Exam, Category])],
  controllers: [ExamController],
  providers: [
    CreateExamService,
    UpdateExamService,
    ListExamsIsActive,
    ListExamsNotActive,
    ActivateExamService,
    DisableExamService,
    DeleteExamService,
  ],
})
export class ExamModule {}
