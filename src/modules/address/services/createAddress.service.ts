import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateAddressDTO from '../dto/CreateAddressDTO';
import Address from '../infra/typeorm/entities/Address';

@Injectable()
class CreateAddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  async execute({
    street,
    number,
    district,
    city,
    state,
  }: CreateAddressDTO): Promise<Address> {
    try {
      const address: Address = this.addressRepository.create({
        street,
        number,
        district,
        city,
        state,
      });

      await this.addressRepository.save(address);

      return address;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default CreateAddressService;
