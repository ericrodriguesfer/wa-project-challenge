import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Address from 'src/modules/address/infra/typeorm/entities/Address';
import CreateAddressService from 'src/modules/address/services/createAddress.service';
import { Repository } from 'typeorm';
import CreateLaboratoryDTO from '../dto/CreateLaboratoryDTO';
import Laboratory from '../infra/typeorm/entities/Laboratory';

@Injectable()
class CreateLaboratoryService {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoryRepository: Repository<Laboratory>,
    private createAddress: CreateAddressService,
  ) {}

  async execute({
    name,
    street,
    number,
    district,
    city,
    state,
  }: CreateLaboratoryDTO): Promise<Laboratory> {
    try {
      const laboratory: Laboratory = await this.laboratoryRepository.findOne({
        where: { name },
      });

      if (laboratory) {
        throw new ConflictException(
          'This name is in usage for other laboratory',
        );
      }

      const address: Address = await this.createAddress.execute({
        street,
        number,
        district,
        city,
        state,
      });

      if (!address) {
        throw new UnauthorizedException('Ocurred error in creation of address');
      }

      const newLaboratory: Laboratory = await this.laboratoryRepository.create({
        name,
        address_id: address.id,
      });

      await this.laboratoryRepository.save(newLaboratory);

      return newLaboratory;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default CreateLaboratoryService;
