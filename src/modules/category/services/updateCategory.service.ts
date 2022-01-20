import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UpdateCategoryDTO from '../dto/UpdateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

@Injectable()
class UpdateCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(id: number, { name }: UpdateCategoryDTO): Promise<Category> {
    try {
      const category: Category = await this.categoryRepository.findOne({
        where: { id },
      });

      if (!category) {
        throw new NotFoundException(
          'This category does not exists in our database',
        );
      }

      const categoryExistsByName: Category =
        await this.categoryRepository.findOne({ where: { name } });

      if (categoryExistsByName) {
        throw new ConflictException('This category already exists');
      }

      const updatedCategory: Category = await this.categoryRepository.merge(
        category,
        { name },
      );

      await this.categoryRepository.save(updatedCategory);

      return updatedCategory;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default UpdateCategoryService;
