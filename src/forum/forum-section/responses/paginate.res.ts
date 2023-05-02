import { ApiProperty } from '@nestjs/swagger';
import { ForumSection } from '../forum-section.entity';

class ForumSectionPaginatePage {
  @ApiProperty({ type: [ForumSection] })
    list:ForumSection[];
  @ApiProperty()
    count: number;
}

export class ForumSectionPaginateResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: ForumSectionPaginatePage })
    data: ForumSectionPaginatePage;
}