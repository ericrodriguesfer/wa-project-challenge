import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Address from './infra/typeorm/entities/Address';
import CreateAddressService from './services/createAddress.service';
import DeleteAddressService from './services/deleteAddress.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Address])],
  controllers: [],
  providers: [CreateAddressService, DeleteAddressService],
  exports: [CreateAddressService, DeleteAddressService],
})
export class AddressModule {}
