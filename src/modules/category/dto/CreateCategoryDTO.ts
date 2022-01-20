import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class CreateCategoryDTO {
  @IsString({ message: 'This name variable need to be string' })
  @IsNotEmpty({ message: 'This name variable can not empty' })
  @ApiProperty()
  name: string;
}

export default CreateCategoryDTO;
