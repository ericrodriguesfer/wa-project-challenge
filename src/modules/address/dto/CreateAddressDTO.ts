import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

class CreateAddressDTO {
  @IsString({ message: 'This street variable need to be string' })
  @IsNotEmpty({ message: 'This street variable can not empty' })
  @ApiProperty()
  street: string;

  @IsInt({ message: 'This number variable neet to be a number' })
  @IsNotEmpty({ message: 'This number variable can not empty' })
  @ApiProperty()
  number: number;

  @IsString({ message: 'This district variable need to be string' })
  @IsNotEmpty({ message: 'This district variable can not empty' })
  @ApiProperty()
  district: string;

  @IsString({ message: 'This city variable need to be string' })
  @IsNotEmpty({ message: 'This city variable can not empty' })
  @ApiProperty()
  city: string;

  @IsString({ message: 'This state variable need to be string' })
  @IsNotEmpty({ message: 'This state variable can not empty' })
  @ApiProperty()
  state: string;
}

export default CreateAddressDTO;
