import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Exam from '../infra/typeorm/entities/Exam';

@Injectable()
class ListExamsNotActive {
  constructor(
    @InjectRepository(Exam) private examRepository: Repository<Exam>,
  ) {}

  async execute(): Promise<Array<Exam>> {
    try {
      const exams: Array<Exam> = await this.examRepository.find({
        where: { status: false },
        relations: ['category'],
      });

      return exams;
    } catch (error) {
      if (error) throw error;
      throw new InternalServerErrorException(
        'Error intern in server, please try again',
      );
    }
  }
}

export default ListExamsNotActive;
