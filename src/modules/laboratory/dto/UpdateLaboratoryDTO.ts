import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UpdateLaboratoryDTO {
  @IsString({ message: 'This name variable need to be string' })
  @IsNotEmpty({ message: 'This name variable can not empty' })
  @IsOptional({
    message: 'This name variable is optional in update',
  })
  @ApiProperty()
  name?: string;

  @IsString({ message: 'This street variable of address need to be string' })
  @IsNotEmpty({ message: 'This street variable of address can not empty' })
  @IsOptional({
    message: 'This street variable of address is optional in update',
  })
  @ApiProperty()
  street?: string;

  @IsInt({ message: 'This number variable of address need to be a number' })
  @IsNotEmpty({ message: 'This number variable of address can not empty' })
  @IsOptional({
    message: 'This number variable of address is optional in update',
  })
  @ApiProperty()
  number?: number;

  @IsString({ message: 'This district variable of address need to be string' })
  @IsNotEmpty({ message: 'This district variable of address can not empty' })
  @IsOptional({
    message: 'This district variable of address is optional in update',
  })
  @ApiProperty()
  district?: string;

  @IsString({ message: 'This city variable of address need to be string' })
  @IsNotEmpty({ message: 'This city variable of address can not empty' })
  @IsOptional({
    message: 'This city variable of address is optional in update',
  })
  @ApiProperty()
  city?: string;

  @IsString({ message: 'This state variable of address need to be string' })
  @IsNotEmpty({ message: 'This state variable of address can not empty' })
  @IsOptional({
    message: 'This state variable of address is optional in update',
  })
  @ApiProperty()
  state?: string;
}

export default UpdateLaboratoryDTO;
