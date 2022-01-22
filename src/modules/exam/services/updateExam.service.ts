import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UpdateExamDTO from '../dto/UpdateExamDTO';
import Exam from '../infra/typeorm/entities/Exam';

@Injectable()
class UpdateExamService {
  constructor(
    @InjectRepository(Exam) private examRepository: Repository<Exam>,
  ) {}

  async execute(id: number, { name }: UpdateExamDTO): Promise<Exam> {
    try {
      const exam: Exam = await this.examRepository.findOne({ where: { id } });

      if (!exam) {
        throw new NotFoundException(
          'This exam does not exists in our database',
        );
      }

      const examExistsByName: Exam = await this.examRepository.findOne({
        where: { name },
      });

      if (examExistsByName) {
        throw new ConflictException('This name already is use for other exam');
      }

      const examUpdated: Exam = await this.examRepository.merge(exam, { name });

      await this.examRepository.save(examUpdated);

      return examUpdated;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default UpdateExamService;
