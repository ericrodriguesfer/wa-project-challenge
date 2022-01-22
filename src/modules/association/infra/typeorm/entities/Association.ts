import { ApiProperty } from '@nestjs/swagger';
import Exam from 'src/modules/exam/infra/typeorm/entities/Exam';
import Laboratory from 'src/modules/laboratory/infra/typeorm/entities/Laboratory';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('association')
class Association {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  exam_id: number;

  @Column()
  @ApiProperty()
  laboratory_id: number;

  @ManyToMany(() => Exam, (exam) => exam.id)
  @JoinColumn({ name: 'exam_id' })
  @ApiProperty()
  exam: Exam;

  @ManyToMany(() => Laboratory, (laboratory) => laboratory.id)
  @JoinColumn({ name: 'laboratory_id' })
  @ApiProperty()
  laboratory: Laboratory;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updated_at: Date;
}

export default Association;
