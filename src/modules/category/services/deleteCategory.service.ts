import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import Category from '../infra/typeorm/entities/Category';

@Injectable()
class DeleteCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(id: number): Promise<boolean> {
    try {
      const category: Category = await this.categoryRepository.findOne({
        where: { id },
      });

      if (!category) {
        throw new NotAcceptableException(
          'This category does not exists in our database',
        );
      }

      const deletedCategory: DeleteResult =
        await this.categoryRepository.delete(category.id);

      if (deletedCategory.affected === 1) {
        return true;
      } else {
        return false;
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
