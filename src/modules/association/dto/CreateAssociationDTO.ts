import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

class CreateAssociationDTO {
  @IsInt({ message: 'This exam_id variable neet to be a number' })
  @IsNotEmpty({ message: 'This exam_id variable can not empty' })
  @ApiProperty()
  exam_id: number;

  @IsInt({ message: 'This laboratory_id variable neet to be a number' })
  @IsNotEmpty({ message: 'This laboratory_id variable can not empty' })
  @ApiProperty()
  laboratory_id: number;
}

export default CreateAssociationDTO;
