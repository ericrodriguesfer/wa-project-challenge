import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateCategoryDTO from '../dto/CreateCategoryDTO';
import Category from '../infra/typeorm/entities/Category';

@Injectable()
class CreateCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute({ name }: CreateCategoryDTO): Promise<Category> {
    try {
      const existsCategoryByName: Category =
        await this.categoryRepository.findOne({ where: { name } });

      if (existsCategoryByName) {
        throw new ConflictException('This category already exists');
      }

      const category: Category = await this.categoryRepository.create({ name });

      await this.categoryRepository.save(category);

      return category;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default CreateCategoryService;
