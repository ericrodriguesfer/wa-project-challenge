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
import CreateAssociationDTO from '../dto/CreateAssociationDTO';
import Association from '../infra/typeorm/entities/Association';

@Injectable()
class CreateAssociationService {
  constructor(
    @InjectRepository(Association)
    private associationRepository: Repository<Association>,
    @InjectRepository(Exam) private examRepository: Repository<Exam>,
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,
  ) {}

  async execute({
    exam_id,
    laboratory_id,
  }: CreateAssociationDTO): Promise<Association> {
    try {
      const exam: Exam = await this.examRepository.findOne({
        where: { id: exam_id },
      });

      if (!exam) {
        throw new NotFoundException(
          'This exam repassed not found in our database',
        );
      }

      if (!exam.status) {
        throw new UnauthorizedException('This exam not state has ben active');
      }

      const laboratory: Laboratory = await this.laboratoryRepository.findOne({
        where: { id: laboratory_id },
      });

      if (!laboratory) {
        throw new NotFoundException(
          'This laboratory repassed not found in our database',
        );
      }

      if (!laboratory.status) {
        throw new UnauthorizedException(
          'This laboratory not state has ben active',
        );
      }

      const searchAssociations: Array<Association> =
        await this.associationRepository.find();

      searchAssociations.map((association: Association) => {
        if (
          association.exam_id === exam_id &&
          association.laboratory_id === laboratory_id
        ) {
          throw new UnauthorizedException(
            'This exam has already been associated with this laboratory before',
          );
        }
      });

      const association: Association = await this.associationRepository.create({
        exam_id,
        laboratory_id,
      });

      await this.associationRepository.save(association);

      return association;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default CreateAssociationService;
