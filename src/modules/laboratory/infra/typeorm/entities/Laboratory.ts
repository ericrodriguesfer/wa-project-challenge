import { ApiProperty } from '@nestjs/swagger';
import Address from 'src/modules/address/infra/typeorm/entities/Address';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('laboratory')
class Laboratory {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ default: false })
  @ApiProperty()
  status: boolean;

  @Column()
  @ApiProperty()
  address_id: number;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  @ApiProperty()
  address: Address;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  updated_at: Date;
}

export default Laboratory;
