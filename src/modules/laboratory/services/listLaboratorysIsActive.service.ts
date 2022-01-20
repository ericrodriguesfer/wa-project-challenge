import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Laboratory from '../infra/typeorm/entities/Laboratory';

@Injectable()
class ListLaboratorysIsActiveService {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,
  ) {}

  async execute(): Promise<Array<Laboratory>> {
    try {
      const laboratorys: Array<Laboratory> =
        await this.laboratoryRepository.find({
          where: { status: true },
          relations: ['address'],
        });

      return laboratorys;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default ListLaboratorysIsActiveService;
