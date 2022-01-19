import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import AddressController from './infra/http/address.controller';
import Address from './infra/typeorm/entities/Address';
import CreateAddressService from './services/createAddress.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [CreateAddressService],
  exports: [CreateAddressService],
})
export class AddressModule {}
