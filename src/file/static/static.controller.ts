import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { FileService } from '../file.service';
const mime = require('mime');

@Controller('file/static')
export class StaticController {
  constructor(private readonly fileService: FileService) {}

  @Get(':id')
  async view(@Param('id') id, @Res({ passthrough: true }) res) {
    const file = await this.fileService.findOne(id);
    res.set({
      'accept-ranges': 'bytes',
      'cache-control': `max-age=${10 * 365 * 24 * 60 * 60}`,
      'expires': 'Mon, 26 Jun 2123 14:00:56 GMT',
      'content-type': mime.getType(`${file.name}.${file.ext}`)
      // 'Content-Disposition': `attachment; filename="${file.name}.${file.ext}"` 
    });
    return new StreamableFile(file.content.buffer);
  }
}
