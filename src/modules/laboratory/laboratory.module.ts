import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '../address/address.module';
import Address from '../address/infra/typeorm/entities/Address';
import Association from '../association/infra/typeorm/entities/Association';
import LaboratoryController from './infra/http/laboratory.controlle';
import Laboratory from './infra/typeorm/entities/Laboratory';
import ActivateLaboratoryService from './services/activateLaboratory.service';
import CreateLaboratoryService from './services/createLaboratory.service';
import DeleteLaboratoryService from './services/deleteLaboratory.service';
import DisableLaboratoryService from './services/disableLaboratory.service';
import ListLaboratorysIsActiveService from './services/listLaboratorysIsActive.service';
import ListLaboratorysNotActiveService from './services/listLaboratorysNotActive.service';
import UpdateLaboratoryService from './services/updateLaboratory.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Laboratory, Address, Association]),
    AddressModule,
  ],
  controllers: [LaboratoryController],
  providers: [
    CreateLaboratoryService,
    ListLaboratorysIsActiveService,
    ListLaboratorysNotActiveService,
    UpdateLaboratoryService,
    ActivateLaboratoryService,
    DisableLaboratoryService,
    DeleteLaboratoryService,
  ],
})
export class LaboratoryModule {}
