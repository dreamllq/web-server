import { Controller, Get, Param, Req, Res, StreamableFile } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FsService } from '../fs.service';
const mime = require('mime');

@ApiTags('f-static')
@Controller('fs/static')
export class StaticController {
  constructor(private readonly fsService: FsService) {}

  @Get('*')
  async static(@Req() req:Request, @Res({ passthrough: true }) res) {
    const f = await this.fsService.findByPath(req.url.replace('/api/fs/static/', ''));
    const file = f.fileDetail.file;
  
    res.set({
      'accept-ranges': 'bytes',
      'cache-control': `max-age=${10 * 365 * 24 * 60 * 60}`,
      'expires': 'Mon, 26 Jun 2123 14:00:56 GMT',
      'content-type': mime.getType(`${file.originFileName || file.name}.${file.ext}`),
      'Content-Disposition': 'inline' 
    });
    return new StreamableFile(file.content.buffer);
  }
  
}
