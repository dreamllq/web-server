import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';


export class ForumPostPaginateByCursorDto {
  @ApiPropertyOptional()
  @ApiProperty()
    versionId:string;
  @ApiProperty()
    pageSize: number;
  @ApiPropertyOptional()
  @ApiProperty()
    sectionId: string;
  
  @ApiPropertyOptional()
  @ApiProperty()
  @Transform(({ value }) => value === 'true')
    relationComments:boolean;

  @ApiPropertyOptional()
  @ApiProperty()
  @Transform(({ value }) => value === 'true')
    relationSection: boolean;
    
  @ApiPropertyOptional()
  @ApiProperty()
  @Transform(({ value }) => value === 'true')
    relationZans: boolean;
    
  @ApiPropertyOptional()
  @ApiProperty()
  @Transform(({ value }) => value === 'true')
    relationCollects: boolean;
}