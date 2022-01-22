import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Exam from 'src/modules/exam/infra/typeorm/entities/Exam';
import Laboratory from 'src/modules/laboratory/infra/typeorm/entities/Laboratory';
import { Repository } from 'typeorm';
import FindLaboratorysOfExamDTO from '../dto/FindLaboratorysOfExamDTO';
import Association from '../infra/typeorm/entities/Association';

@Injectable()
class FindAllLaboratorysOfExamAssociationService {
  constructor(
    @InjectRepository(Association)
    private associationRepository: Repository<Association>,
    @InjectRepository(Exam) private examRepository: Repository<Exam>,
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,
  ) {}

  async execute({
    exam_name,
  }: FindLaboratorysOfExamDTO): Promise<Array<Laboratory>> {
    try {
      const exam: Exam = await this.examRepository.findOne({
        where: { name: exam_name },
      });

      if (!exam) {
        throw new NotFoundException(
          'This exam repassed does not exists in our database',
        );
      }

      if (!exam.status) {
        throw new UnauthorizedException(
          'This exam repassed not have the state active',
        );
      }

      const associations: Array<Association> =
        await this.associationRepository.find({ where: { exam_id: exam.id } });

      const associateLaboratorys: Array<Laboratory> = await Promise.all(
        associations.map(async (association: Association) => {
          return await this.laboratoryRepository.findOne({
            where: { id: association.laboratory_id },
            relations: ['address'],
          });
        }),
      );

      return associateLaboratorys;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default FindAllLaboratorysOfExamAssociationService;
