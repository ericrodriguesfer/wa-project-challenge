import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import Address from '../infra/typeorm/entities/Address';

@Injectable()
class DeleteAddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  async execute(id: number): Promise<void> {
    try {
      const address: Address = await this.addressRepository.findOne({
        where: { id },
      });

      if (!address) {
        throw new NotFoundException(
          'The address of this deleted lab was not found',
        );
      }

      const successDeleteAddress: DeleteResult =
        await this.addressRepository.delete(address.id);
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default DeleteAddressService;
