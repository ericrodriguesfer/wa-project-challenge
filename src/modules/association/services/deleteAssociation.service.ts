import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import Association from '../infra/typeorm/entities/Association';

@Injectable()
class DeleteAssociantionService {
  constructor(
    @InjectRepository(Association)
    private associationRepository: Repository<Association>,
  ) {}

  async execute(id: number): Promise<boolean> {
    try {
      const association: Association = await this.associationRepository.findOne(
        { where: { id } },
      );

      if (!association) {
        throw new NotFoundException(
          'This association int between exam and laboratory does not exists in our database',
        );
      }

      const deletedAssociation: DeleteResult =
        await this.associationRepository.delete(association.id);

      if (deletedAssociation.affected === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default DeleteAssociantionService;
