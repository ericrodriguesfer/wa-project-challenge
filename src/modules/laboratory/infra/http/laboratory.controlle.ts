import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateLaboratoryDTO from '../../dto/CreateLaboratoryDTO';
import UpdateLaboratoryDTO from '../../dto/UpdateLaboratoryDTO';
import ActivateLaboratoryService from '../../services/activateLaboratory.service';
import CreateLaboratoryService from '../../services/createLaboratory.service';
import DeleteLaboratoryService from '../../services/deleteLaboratory.service';
import DisableLaboratoryService from '../../services/disableLaboratory.service';
import ListLaboratorysIsActiveService from '../../services/listLaboratorysIsActive.service';
import ListLaboratorysNotActiveService from '../../services/listLaboratorysNotActive.service';
import UpdateLaboratoryService from '../../services/updateLaboratory.service';
import Laboratory from '../typeorm/entities/Laboratory';

@Controller('laboratory')
class LaboratoryController {
  constructor(
    private createLaboratoryService: CreateLaboratoryService,
    private listAllLaboratorysActiveService: ListLaboratorysIsActiveService,
    private listAllLaboratorysNotActiveService: ListLaboratorysNotActiveService,
    private updateLaboratoryService: UpdateLaboratoryService,
    private activateLaboratoryServic: ActivateLaboratoryService,
    private disableLaboratoryService: DisableLaboratoryService,
    private deleteLaboratoryService: DeleteLaboratoryService,
  ) {}

  @Get('active')
  listAllLaboratoryActives(): Promise<Array<Laboratory>> {
    return this.listAllLaboratorysActiveService.execute();
  }

  @Get('notactive')
  listAllLaboratoryNotActives(): Promise<Array<Laboratory>> {
    return this.listAllLaboratorysNotActiveService.execute();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  createLaboratory(
    @Body()
    { name, street, number, district, city, state }: CreateLaboratoryDTO,
  ): Promise<Laboratory> {
    return this.createLaboratoryService.execute({
      name,
      street,
      number,
      district,
      city,
      state,
    });
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  updateLaboratory(
    @Param('id') id: number,
    @Body()
    { name, street, number, district, city, state }: UpdateLaboratoryDTO,
  ): Promise<Laboratory> {
    return this.updateLaboratoryService.execute(id, {
      name,
      street,
      number,
      district,
      city,
      state,
    });
  }

  @Put('activate/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  activateLaboratory(@Param('id') id: number): Promise<Laboratory> {
    return this.activateLaboratoryServic.execute(id);
  }

  @Put('disable/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  disableLaboratory(@Param('id') id: number): Promise<Laboratory> {
    return this.disableLaboratoryService.execute(id);
  }

  @Delete(':id')
  deleteLaboratory(@Param('id') id: number): Promise<boolean> {
    return this.deleteLaboratoryService.execute(id);
  }
}

export default LaboratoryController;
