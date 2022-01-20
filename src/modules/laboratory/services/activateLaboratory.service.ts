import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Laboratory from '../infra/typeorm/entities/Laboratory';

@Injectable()
class ActivateLaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,
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

      if (laboratory.status) {
        throw new ConflictException('This laboratory has ben active');
      }

      const activateLaboratory: Laboratory =
        await this.laboratoryRepository.merge(laboratory, { status: true });

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

export default ActivateLaboratoryService;
