import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Exam from '../exam/infra/typeorm/entities/Exam';
import Laboratory from '../laboratory/infra/typeorm/entities/Laboratory';
import AssociationController from './infra/http/association.controller';
import Association from './infra/typeorm/entities/Association';
import CreateAssociationService from './services/createAssociation.service';
import DeleteAssociantionService from './services/deleteAssociation.service';
import FindAllLaboratorysOfExamAssociationService from './services/findAllLaboratorysOfExamAssociation.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Association, Exam, Laboratory]),
  ],
  controllers: [AssociationController],
  providers: [
    CreateAssociationService,
    FindAllLaboratorysOfExamAssociationService,
    DeleteAssociantionService,
  ],
})
export class AssociationModule {}
