import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './file-upload.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  id: number;
}
