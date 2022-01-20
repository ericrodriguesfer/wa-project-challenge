import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Address from 'src/modules/address/infra/typeorm/entities/Address';
import { Repository } from 'typeorm';
import UpdateLaboratoryDTO from '../dto/UpdateLaboratoryDTO';
import Laboratory from '../infra/typeorm/entities/Laboratory';

@Injectable()
class UpdateLaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  async execute(
    id,
    { name, street, number, district, city, state }: UpdateLaboratoryDTO,
  ): Promise<Laboratory> {
    try {
      const laboratory: Laboratory = await this.laboratoryRepository.findOne({
        where: { id },
      });

      if (!laboratory) {
        throw new NotFoundException(
          'This laboratory repassed does not exists in our database',
        );
      }

      const existsOtherLaboratoryByName: Laboratory =
        await this.laboratoryRepository.findOne({ where: { name } });

      if (existsOtherLaboratoryByName) {
        throw new ConflictException(
          'This name is in usage for other laboratory',
        );
      }

      const address: Address = await this.addressRepository.findOne({
        where: { id: laboratory.address_id },
      });

      if (!address) {
        throw new NotFoundException(
          'The address of laboratory does not exists in our database',
        );
      }

      if (
        street !== address.street ||
        number !== address.number ||
        district !== address.district ||
        city !== address.city ||
        state !== address.state
      ) {
        const updateAddress: Address = await this.addressRepository.merge(
          address,
          { street, number, district, city, state },
        );

        await this.addressRepository.save(updateAddress);
      }

      if (name !== laboratory.name) {
        const updateLaboratory: Laboratory =
          await this.laboratoryRepository.merge(laboratory, { name });

        await this.laboratoryRepository.save(updateLaboratory);

        return updateLaboratory;
      }

      return laboratory;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default UpdateLaboratoryService;
