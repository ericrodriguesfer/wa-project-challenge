import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  street: string;

  @Column()
  @ApiProperty()
  number: number;

  @Column()
  @ApiProperty()
  district: string;

  @Column()
  @ApiProperty()
  city: string;

  @Column()
  @ApiProperty()
  state: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updated_at: Date;
}

export default Address;
