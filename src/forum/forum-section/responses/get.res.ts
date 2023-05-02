import { ApiProperty } from '@nestjs/swagger';
import { ForumSection } from '../forum-section.entity';

export class ForumSectionGetResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: ForumSection })
    data: ForumSection;
}