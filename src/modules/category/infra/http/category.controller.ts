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
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import CreateCategoryDTO from '../../dto/CreateCategoryDTO';
import UpdateCategoryDTO from '../../dto/UpdateCategoryDTO';
import CreateCategoryService from '../../services/createCategory.service';
import DeleteCategoryService from '../../services/deleteCategory.service';
import ListCategoryService from '../../services/listCategory.service';
import UpdateCategoryService from '../../services/updateCategory.service';
import Category from '../typeorm/entities/Category';

@ApiTags('category')
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
  @ApiOperation({
    summary: 'this route list all categorys registereds in our database',
  })
  @ApiOkResponse({
    description: 'Listing all categorys registereds in our database',
    type: Category,
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  getCategorys(): Promise<Array<Category>> {
    return this.listCategoryService.execute();
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route create a category in our database',
  })
  @ApiOkResponse({
    description: 'Creating the category in our database',
    type: Category,
  })
  @ApiConflictResponse({
    description: 'This name repassed with category already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  createCategory(@Body() { name }: CreateCategoryDTO): Promise<Category> {
    return this.createCategoryService.execute({ name });
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route update a category of our database',
  })
  @ApiOkResponse({
    description: 'Updateing the category in our database',
    type: Category,
  })
  @ApiNotFoundResponse({
    description: 'Not possible found this category in our database',
  })
  @ApiConflictResponse({
    description: 'This name repassed with category already exists',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  updateCategory(
    @Param('id') id: number,
    @Body() { name }: UpdateCategoryDTO,
  ): Promise<Category> {
    return this.updateCategoryService.execute(id, { name });
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({
    summary: 'this route delete a category of our database',
  })
  @ApiOkResponse({
    description: 'Deleting this category in our database',
  })
  @ApiNotFoundResponse({
    description: 'Not possible found this category in our database',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error intern in server, please try again',
  })
  deleteCategory(@Param('id') id: number): Promise<boolean> {
    return this.deleteCategoryService.execute(id);
  }
}

export default CategoryController;
