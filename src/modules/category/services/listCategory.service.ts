import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Category from '../infra/typeorm/entities/Category';

@Injectable()
class ListCategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute(): Promise<Array<Category>> {
    try {
      const categorys: Array<Category> = await this.categoryRepository.find();

      return categorys;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default ListCategoryService;
