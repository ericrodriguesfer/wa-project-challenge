import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateCategoryDTO from '../../dto/CreateCategoryDTO';
import UpdateCategoryDTO from '../../dto/UpdateCategoryDTO';
import CreateCategoryService from '../../services/createCategory.service';
import DeleteCategoryService from '../../services/deleteCategory.service';
import ListCategoryService from '../../services/listCategory.service';
import UpdateCategoryService from '../../services/updateCategory.service';
import Category from '../typeorm/entities/Category';

@Controller('category')
class CategoryController {
  constructor(
    private createCategoryService: CreateCategoryService,
    private deleteCategoryService: DeleteCategoryService,
    private listCategoryService: ListCategoryService,
    private updateCategoryService: UpdateCategoryService,
  ) {}

  @Get()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  getCategorys(): Promise<Array<Category>> {
    return this.listCategoryService.execute();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  createCategory(@Body() { name }: CreateCategoryDTO): Promise<Category> {
    return this.createCategoryService.execute({ name });
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  updateCategory(
    @Param('id') id: number,
    @Body() { name }: UpdateCategoryDTO,
  ): Promise<Category> {
    return this.updateCategoryService.execute(id, { name });
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  deleteCategory(@Param('id') id: number): Promise<boolean> {
    return this.deleteCategoryService.execute(id);
  }
}

export default CategoryController;
