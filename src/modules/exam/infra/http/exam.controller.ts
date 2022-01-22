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
import CreateExamDTO from '../../dto/CreateExamDTO';
import UpdateExamDTO from '../../dto/UpdateExamDTO';
import ActivateExamService from '../../services/activateExam.service';
import CreateExamService from '../../services/createExam.service';
import DeleteExamService from '../../services/deleteExam.service';
import DisableExamService from '../../services/disableExam.service';
import ListExamsIsActive from '../../services/listExamsIsActive.service';
import ListExamsNotActive from '../../services/listExamsNotActive.service';
import UpdateExamService from '../../services/updateExam.service';
import Exam from '../typeorm/entities/Exam';

@ApiTags('exam')
@Controller('exam')
class ExamController {
  constructor(
    private createExamService: CreateExamService,
    private updateExamService: UpdateExamService,
    private listAllExamsActiveService: ListExamsIsActive,
    private listAllExamsNotActiveService: ListExamsNotActive,
    private activateExamService: ActivateExamService,
    private disableExamService: DisableExamService,
    private deleteExamService: DeleteExamService,
  ) {}

  @Get('active')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route list all exams with active status',
  })
  @ApiOkResponse({
    description: 'Listing all exeams with active status',
    type: Exam,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  listAllExamsActive(): Promise<Array<Exam>> {
    return this.listAllExamsActiveService.execute();
  }

  @Get('notactive')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route list all exams with not active status',
  })
  @ApiOkResponse({
    description: 'Listing all exeams with not active status',
    type: Exam,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  listExamsNotActive(): Promise<Array<Exam>> {
    return this.listAllExamsNotActiveService.execute();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route create a exam in our database',
  })
  @ApiOkResponse({
    description: 'Creating the exam in our database',
    type: Exam,
  })
  @ApiNotFoundResponse({
    description:
      'The category repassed with the exam, not found in our database',
  })
  @ApiConflictResponse({
    description: 'This name repassed with exam already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  creteExam(@Body() { name, category_id }: CreateExamDTO): Promise<Exam> {
    return this.createExamService.execute({ name, category_id });
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route update a exam of our database',
  })
  @ApiOkResponse({
    description: 'Updateing the exam in our database',
    type: Exam,
  })
  @ApiNotFoundResponse({
    description: 'Not possible found this exam in our database',
  })
  @ApiConflictResponse({
    description: 'This name repassed with exam already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  updateExam(
    @Param('id') id: number,
    @Body() { name }: UpdateExamDTO,
  ): Promise<Exam> {
    return this.updateExamService.execute(id, { name });
  }

  @Put('activate/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route active a exam of our database',
  })
  @ApiOkResponse({
    description: 'Activing the exam in our database',
    type: Exam,
  })
  @ApiNotFoundResponse({
    description: 'Not possible found this exam in our database',
  })
  @ApiConflictResponse({
    description: 'This exam has ben it is status active',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  activateExam(@Param('id') id: number): Promise<Exam> {
    return this.activateExamService.execute(id);
  }

  @Put('disable/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route disable a exam of our database',
  })
  @ApiOkResponse({
    description: 'Desableding the exam in our database',
    type: Exam,
  })
  @ApiNotFoundResponse({
    description: 'Not possible found this exam in our database',
  })
  @ApiConflictResponse({
    description: 'This exam has ben it is status disable',
  })
  @ApiUnauthorizedResponse({
    description:
      'This exam have association active with at least one laboratory',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  disableExam(@Param('id') id: number): Promise<Exam> {
    return this.disableExamService.execute(id);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route delete a exam of our database',
  })
  @ApiOkResponse({
    description: 'Deleting this exam in our database',
  })
  @ApiNotFoundResponse({
    description: 'Not possible found this exam in our database',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  deleteExam(@Param('id') id: number): Promise<boolean> {
    return this.deleteExamService.execute(id);
  }
}

export default ExamController;
