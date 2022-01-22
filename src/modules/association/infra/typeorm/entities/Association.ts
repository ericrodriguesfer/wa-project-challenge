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
  id: number;

  @Column()
  exam_id: number;

  @Column()
  laboratory_id: number;

  @ManyToMany(() => Exam, (exam) => exam.id)
  @JoinColumn({ name: 'exam_id' })
  exam: Exam;

  @ManyToMany(() => Laboratory, (laboratory) => laboratory.id)
  @JoinColumn({ name: 'laboratory_id' })
  laboratory: Laboratory;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}

export default Association;
