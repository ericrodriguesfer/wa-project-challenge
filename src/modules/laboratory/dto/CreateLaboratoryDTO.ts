import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

class CreateLaboratoryDTO {
  @IsString({ message: 'This name variable need to be string' })
  @IsNotEmpty({ message: 'This name variable can not empty' })
  @ApiProperty()
  name: string;

  @IsString({ message: 'This street variable of address need to be string' })
  @IsNotEmpty({ message: 'This street variable of address can not empty' })
  @ApiProperty()
  street: string;

  @IsInt({ message: 'This number variable of address need to be a number' })
  @IsNotEmpty({ message: 'This number variable of address can not empty' })
  @ApiProperty()
  number: number;

  @IsString({ message: 'This district variable of address need to be string' })
  @IsNotEmpty({ message: 'This district variable of address can not empty' })
  @ApiProperty()
  district: string;

  @IsString({ message: 'This city variable of address need to be string' })
  @IsNotEmpty({ message: 'This city variable of address can not empty' })
  @ApiProperty()
  city: string;

  @IsString({ message: 'This state variable of address need to be string' })
  @IsNotEmpty({ message: 'This state variable of address can not empty' })
  @ApiProperty()
  state: string;
}

export default CreateLaboratoryDTO;
