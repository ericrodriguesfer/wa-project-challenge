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
import Laboratory from '../infra/typeorm/entities/Laboratory';

@Injectable()
class DisableLaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,
    @InjectRepository(Association)
    private associationRepository: Repository<Association>,
  ) {}

  async execute(id: number): Promise<Laboratory> {
    try {
      const laboratory: Laboratory = await this.laboratoryRepository.findOne({
        where: { id },
      });

      if (!laboratory) {
        throw new NotFoundException(
          'This laboratory repassed does not exists in our database',
        );
      }

      if (!laboratory.status) {
        throw new ConflictException('This laboratory has ben not active');
      }

      const associations: Array<Association> =
        await this.associationRepository.find({
          where: { laboratory_id: laboratory.id },
        });

      if (associations.length > 0) {
        throw new UnauthorizedException(
          'This laboratory has associations with at least one exam',
        );
      }

      const activateLaboratory: Laboratory =
        await this.laboratoryRepository.merge(laboratory, { status: false });

      await this.laboratoryRepository.save(activateLaboratory);

      return activateLaboratory;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default DisableLaboratoryService;
