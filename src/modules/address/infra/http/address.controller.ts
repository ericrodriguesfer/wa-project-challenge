import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateAddressDTO from '../../dto/CreateAddressDTO';
import CreateAddressService from '../../services/createAddress.service';
import Address from '../typeorm/entities/Address';

@Controller('address')
class AddressController {
  constructor(private createAddressService: CreateAddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  createAddres(
    @Body() { street, number, district, city, state }: CreateAddressDTO,
  ): Promise<Address> {
    return this.createAddressService.execute({
      street,
      number,
      district,
      city,
      state,
    });
  }
}

export default AddressController;
