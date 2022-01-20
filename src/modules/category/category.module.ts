import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoryController from './infra/http/category.controller';
import Category from './infra/typeorm/entities/Category';
import CreateCategoryService from './services/createCategory.service';
import DeleteCategoryService from './services/deleteCategory.service';
import ListCategoryService from './services/listCategory.service';
import UpdateCategoryService from './services/updateCategory.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [
    CreateCategoryService,
    DeleteCategoryService,
    ListCategoryService,
    UpdateCategoryService,
  ],
})
export class CategoryModule {}
