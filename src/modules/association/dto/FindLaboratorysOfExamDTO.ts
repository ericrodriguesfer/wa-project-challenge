import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class FindLaboratorysOfExamDTO {
  @IsString({ message: 'This exam_name variable need to be string' })
  @IsNotEmpty({ message: 'This exam_name variable can not empty' })
  @ApiProperty()
  exam_name: string;
}

export default FindLaboratorysOfExamDTO;
