import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

class CreateExamDTO {
  @IsString({ message: 'This name variable need to be string' })
  @IsNotEmpty({ message: 'This name variable can not empty' })
  @ApiProperty()
  name: string;

  @IsInt({ message: 'This category_id variable neet to be a number' })
  @IsNotEmpty({ message: 'This category_id variable can not empty' })
  @ApiProperty()
  category_id: number;
}

export default CreateExamDTO;
