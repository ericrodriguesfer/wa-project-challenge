import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Address from 'src/modules/address/infra/typeorm/entities/Address';
import DeleteAddressService from 'src/modules/address/services/deleteAddress.service';
import { DeleteResult, Repository } from 'typeorm';
import IReturnStatmnetDeleteLaboratory from '../dto/IReturnStatmnetDeleteLaboratory';
import Laboratory from '../infra/typeorm/entities/Laboratory';

@Injectable()
class DeleteLaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private deleteAddressService: DeleteAddressService,
  ) {}

  async execute(id: number): Promise<IReturnStatmnetDeleteLaboratory> {
    try {
      const laboratory: Laboratory = await this.laboratoryRepository.findOne({
        where: { id },
      });

      if (!laboratory) {
        throw new NotFoundException(
          'This laboratory repassed does not exists in our database',
        );
      }

      const successDeleteLaboratory: DeleteResult =
        await this.laboratoryRepository.delete(laboratory.id);

      if (successDeleteLaboratory.affected === 1) {
        await this.deleteAddressService.execute(laboratory.address_id);

        return { message: 'This laboratory was deleted with success' };
      } else {
        return { message: 'This laboratory was not successfully deleted' };
      }
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default DeleteLaboratoryService;
