import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Exam from '../infra/typeorm/entities/Exam';

@Injectable()
class ActivateExamService {
  constructor(
    @InjectRepository(Exam) private examRepository: Repository<Exam>,
  ) {}

  async execute(id: number): Promise<Exam> {
    try {
      const exam: Exam = await this.examRepository.findOne({ where: { id } });

      if (!exam) {
        throw new NotFoundException(
          'This exam repassed does not exists in our database',
        );
      }

      if (exam.status) {
        throw new ConflictException('This exam has ben active');
      }

      const activateExam: Exam = await this.examRepository.merge(exam, {
        status: true,
      });

      await this.examRepository.save(activateExam);

      return activateExam;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default ActivateExamService;
