import { ApiProperty } from '@nestjs/swagger';

class TreeNode {
  @ApiProperty()
    id:number;
  @ApiProperty()
    parentId: number;
  @ApiProperty()
    name: string;
  @ApiProperty({ type: [TreeNode] })
    children?: TreeNode[];
}

export class TreeDataResponse {
  @ApiProperty()
    code: number;
  @ApiProperty({ type: [TreeNode] })
    data:TreeNode[];
}