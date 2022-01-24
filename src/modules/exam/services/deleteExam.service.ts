import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import IReturnStatmentDeleteExam from '../dto/IReturnStatmentDeleteExam';
import Exam from '../infra/typeorm/entities/Exam';

@Injectable()
class DeleteExamService {
  constructor(
    @InjectRepository(Exam) private examRepository: Repository<Exam>,
  ) {}

  async execute(id: number): Promise<IReturnStatmentDeleteExam> {
    try {
      const exam: Exam = await this.examRepository.findOne({ where: { id } });

      if (!exam) {
        throw new NotFoundException(
          'This exam repassed does not exists in our database',
        );
      }

      const successDeleteExam: DeleteResult = await this.examRepository.delete(
        exam.id,
      );

      if (successDeleteExam.affected === 1) {
        return { message: 'This exam was deleted with success' };
      } else {
        return { message: 'This exam was not successfully deleted' };
      }
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default DeleteExamService;
