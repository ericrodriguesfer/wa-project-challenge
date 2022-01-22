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
  listAllExamsActive(): Promise<Array<Exam>> {
    return this.listAllExamsActiveService.execute();
  }

  @Get('notactive')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  listExamsNotActive(): Promise<Array<Exam>> {
    return this.listAllExamsNotActiveService.execute();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  creteExam(@Body() { name, category_id }: CreateExamDTO): Promise<Exam> {
    return this.createExamService.execute({ name, category_id });
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  updateExam(
    @Param('id') id: number,
    @Body() { name }: UpdateExamDTO,
  ): Promise<Exam> {
    return this.updateExamService.execute(id, { name });
  }

  @Put('activate/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  activateExam(@Param('id') id: number): Promise<Exam> {
    return this.activateExamService.execute(id);
  }

  @Put('disable/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  disableExam(@Param('id') id: number): Promise<Exam> {
    return this.disableExamService.execute(id);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  deleteExam(@Param('id') id: number): Promise<boolean> {
    return this.deleteExamService.execute(id);
  }
}

export default ExamController;
