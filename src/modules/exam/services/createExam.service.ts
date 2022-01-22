import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/modules/category/infra/typeorm/entities/Category';
import { Repository } from 'typeorm';
import CreateExamDTO from '../dto/CreateExamDTO';
import Exam from '../infra/typeorm/entities/Exam';

@Injectable()
class CreateExamService {
  constructor(
    @InjectRepository(Exam) private examRepository: Repository<Exam>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async execute({ name, category_id }: CreateExamDTO): Promise<Exam> {
    try {
      const category: Category = await this.categoryRepository.findOne({
        where: { id: category_id },
      });

      if (!category) {
        throw new NotFoundException(
          'This category repassed in exam does not exists in our database',
        );
      }

      const examExistsByName: Exam = await this.examRepository.findOne({
        where: { name },
      });

      if (examExistsByName) {
        throw new NotFoundException('This exam already exists');
      }

      const exam: Exam = await this.examRepository.create({
        name,
        category_id: category.id,
      });

      await this.examRepository.save(exam);

      return exam;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default CreateExamService;
