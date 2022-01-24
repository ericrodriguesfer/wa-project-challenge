import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import IReturnStatmentDeleteCategory from '../dto/IReturnStatmentDeleteCategory';
import Category from '../infra/typeorm/entities/Category';

@Injectable()
class DeleteCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(id: number): Promise<IReturnStatmentDeleteCategory> {
    try {
      const category: Category = await this.categoryRepository.findOne({
        where: { id },
      });

      if (!category) {
        throw new NotFoundException(
          'This category does not exists in our database',
        );
      }

      const deletedCategory: DeleteResult =
        await this.categoryRepository.delete(category.id);

      if (deletedCategory.affected === 1) {
        return { message: 'This category was deleted with success' };
      } else {
        return { message: 'This category was not successfully deleted' };
      }
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default DeleteCategoryService;
