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
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import CreateLaboratoryDTO from '../../dto/CreateLaboratoryDTO';
import IReturnStatmnetDeleteLaboratory from '../../dto/IReturnStatmnetDeleteLaboratory';
import UpdateLaboratoryDTO from '../../dto/UpdateLaboratoryDTO';
import ActivateLaboratoryService from '../../services/activateLaboratory.service';
import CreateLaboratoryService from '../../services/createLaboratory.service';
import DeleteLaboratoryService from '../../services/deleteLaboratory.service';
import DisableLaboratoryService from '../../services/disableLaboratory.service';
import ListLaboratorysIsActiveService from '../../services/listLaboratorysIsActive.service';
import ListLaboratorysNotActiveService from '../../services/listLaboratorysNotActive.service';
import UpdateLaboratoryService from '../../services/updateLaboratory.service';
import Laboratory from '../typeorm/entities/Laboratory';

@ApiTags('laboratory')
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
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route list all laboratorys with active status',
  })
  @ApiOkResponse({
    description: 'Listing all laboratorys with active status',
    type: Laboratory,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  listAllLaboratoryActives(): Promise<Array<Laboratory>> {
    return this.listAllLaboratorysActiveService.execute();
  }

  @Get('notactive')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route list all laboratorys with not active status',
  })
  @ApiOkResponse({
    description: 'Listing all laboratorys with not active status',
    type: Laboratory,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  listAllLaboratoryNotActives(): Promise<Array<Laboratory>> {
    return this.listAllLaboratorysNotActiveService.execute();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route create a laboratory in our database',
  })
  @ApiOkResponse({
    description: 'Creating the laboratory in our database',
    type: Laboratory,
  })
  @ApiUnauthorizedResponse({
    description: 'Ocurred a error in creation of address this laboratory',
  })
  @ApiConflictResponse({
    description: 'This name repassed with laboratory already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
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
  @ApiOperation({
    summary: 'this route update a laboratory of our database',
  })
  @ApiOkResponse({
    description: 'Updateing the laboratory in our database',
    type: Laboratory,
  })
  @ApiNotFoundResponse({
    description:
      'Not possible found this laboratory in our database or Not possible found this address repassed on laboratory in our database',
  })
  @ApiConflictResponse({
    description: 'This name repassed with laboratory already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
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
  @ApiOperation({
    summary: 'this route active a laboratory of our database',
  })
  @ApiOkResponse({
    description: 'Activing the laboratory in our database',
    type: Laboratory,
  })
  @ApiNotFoundResponse({
    description: 'Not possible found this laboratory in our database',
  })
  @ApiConflictResponse({
    description: 'This laboratory has ben it is status active',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  activateLaboratory(@Param('id') id: number): Promise<Laboratory> {
    return this.activateLaboratoryServic.execute(id);
  }

  @Put('disable/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route disable a laboratory of our database',
  })
  @ApiOkResponse({
    description: 'Desableding the laboratory in our database',
    type: Laboratory,
  })
  @ApiNotFoundResponse({
    description: 'Not possible found this laboratory in our database',
  })
  @ApiConflictResponse({
    description: 'This laboratory has ben it is status disable',
  })
  @ApiUnauthorizedResponse({
    description:
      'This laboratory have association active with at least one exam',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  disableLaboratory(@Param('id') id: number): Promise<Laboratory> {
    return this.disableLaboratoryService.execute(id);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route delete a laboratory of our database',
  })
  @ApiOkResponse({
    description: 'Deleting this laboratory in our database',
  })
  @ApiNotFoundResponse({
    description: 'Not possible found this laboratory in our database',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  deleteLaboratory(
    @Param('id') id: number,
  ): Promise<IReturnStatmnetDeleteLaboratory> {
    return this.deleteLaboratoryService.execute(id);
  }
}

export default LaboratoryController;
