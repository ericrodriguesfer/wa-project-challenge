import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import Laboratory from 'src/modules/laboratory/infra/typeorm/entities/Laboratory';
import CreateAssociationDTO from '../../dto/CreateAssociationDTO';
import FindLaboratorysOfExamDTO from '../../dto/FindLaboratorysOfExamDTO';
import CreateAssociationService from '../../services/createAssociation.service';
import DeleteAssociantionService from '../../services/deleteAssociation.service';
import FindAllLaboratorysOfExamAssociationService from '../../services/findAllLaboratorysOfExamAssociation.service';
import Association from '../typeorm/entities/Association';

@ApiTags('association')
@Controller('association')
class AssociationController {
  constructor(
    private createAssociationService: CreateAssociationService,
    private findAllLaboratorysOfExamAssociationService: FindAllLaboratorysOfExamAssociationService,
    private deleteAssociationService: DeleteAssociantionService,
  ) {}

  @Get()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary:
      'this route list all laboratorys what have association with a exam',
  })
  @ApiOkResponse({
    description:
      'Listing all laboratorys what have association with a exam in our database',
    type: Association,
  })
  @ApiNotFoundResponse({
    description:
      'This exam repassed for search of laboratorys associate does not exists in our database',
  })
  @ApiUnauthorizedResponse({
    description:
      'This exam repassed for search of laboratorys associate does not have state active',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  findAllLaboratorysOfExamAssociate(
    @Body() { exam_name }: FindLaboratorysOfExamDTO,
  ): Promise<Array<Laboratory>> {
    return this.findAllLaboratorysOfExamAssociationService.execute({
      exam_name,
    });
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route create a association in our database',
  })
  @ApiOkResponse({
    description: 'Creating the association in our database',
    type: Association,
  })
  @ApiNotFoundResponse({
    description:
      'This exam repassed not found in our database or This laboratory repassed not found in our database',
  })
  @ApiUnauthorizedResponse({
    description:
      'This exam repassed not state has ben active or This laboratory repassed not state has ben active or This association has already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  createAssociation(
    @Body() { exam_id, laboratory_id }: CreateAssociationDTO,
  ): Promise<Association> {
    return this.createAssociationService.execute({ exam_id, laboratory_id });
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary:
      'this route delete a association int between exam and laboratory of our database',
  })
  @ApiOkResponse({
    description: 'Deleting this association in our database',
  })
  @ApiNotFoundResponse({
    description:
      'This association repassed for deleting does not exists in our database',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  deleteAssociation(@Param('id') id: number): Promise<boolean> {
    return this.deleteAssociationService.execute(id);
  }
}

export default AssociationController;
