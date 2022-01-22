import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('category')
class Category {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updated_at: Date;
}

export default Category;
