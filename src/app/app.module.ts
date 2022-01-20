import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Address from 'src/modules/address/infra/typeorm/entities/Address';
import { CategoryModule } from 'src/modules/category/category.module';
import Category from 'src/modules/category/infra/typeorm/entities/Category';
import Laboratory from 'src/modules/laboratory/infra/typeorm/entities/Laboratory';
import { LaboratoryModule } from 'src/modules/laboratory/laboratory.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Address, Laboratory, Category],
    }),
    LaboratoryModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
