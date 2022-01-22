import { ApiProperty } from '@nestjs/swagger';
import Category from 'src/modules/category/infra/typeorm/entities/Category';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('exam')
class Exam {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  status: boolean;

  @Column()
  @ApiProperty()
  category_id: number;

  @OneToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  @ApiProperty()
  category: Category;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updated_at: Date;
}

export default Exam;
