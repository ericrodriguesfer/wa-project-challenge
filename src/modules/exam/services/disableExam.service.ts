import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Association from 'src/modules/association/infra/typeorm/entities/Association';
import { Repository } from 'typeorm';
import Exam from '../infra/typeorm/entities/Exam';

@Injectable()
class DisableExamService {
  constructor(
    @InjectRepository(Exam) private examRepository: Repository<Exam>,
    @InjectRepository(Association)
    private associationRepository: Repository<Association>,
  ) {}

  async execute(id: number): Promise<Exam> {
    try {
      const exam: Exam = await this.examRepository.findOne({ where: { id } });

      if (!exam) {
        throw new NotFoundException(
          'This exam repassed does not exists in our database',
        );
      }

      if (!exam.status) {
        throw new ConflictException('This exam has ben not active');
      }

      const associations: Array<Association> =
        await this.associationRepository.find({ where: { exam_id: exam.id } });

      if (associations.length > 0) {
        throw new UnauthorizedException(
          'This exam has associations with at least one laboratory',
        );
      }

      const disableExam: Exam = await this.examRepository.merge(exam, {
        status: false,
      });

      await this.examRepository.save(disableExam);

      return disableExam;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default DisableExamService;
