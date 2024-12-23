import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { FileService } from '../file.service';
import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
const mime = require('mime');

@ApiTags('file-static')
@Controller('file/static')
export class StaticController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({ operationId: 'view' })
  @ApiParam({ name: 'id' })
  @ApiResponse({
    status: 200,
    description: '返回指定ID的图片',
    schema: {
      type: 'string',
      format: 'binary' // 使用 schema 中的 format 属性
    }
  })
  @Get(':id')
  async view(@Param('id') id, @Res({ passthrough: true }) res) {
    const file = await this.fileService.findOne(id, { relations: { content: true } });
    console.log(file);
    
    res.set({
      'accept-ranges': 'bytes',
      'cache-control': `max-age=${10 * 365 * 24 * 60 * 60}`,
      'expires': 'Mon, 26 Jun 2123 14:00:56 GMT',
      'content-type': mime.getType(`${file.name}.${file.ext}`),
      'Content-Disposition': `attachment; filename="${file.name}.${file.ext}"` 
    });
    return new StreamableFile(file.content.buffer);
  }
}
