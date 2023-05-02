import { Controller, Get, Logger, Param, Post, Req, Res } from '@nestjs/common';
import { WeixinOfficialAccountNotifyService } from './weixin-official-account-notify.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('weixin-official-account-notify')
@Controller('weixin-platform/official-account/notify')
export class WeixinOfficialAccountNotifyController {
  
  private readonly logger = new Logger('WeixinOfficialAccountNotifyController');
  constructor(private readonly weixinOfficialAccountNotifyService:WeixinOfficialAccountNotifyService) {}

  
  @ApiParam({ name: 'appid' })
  @Post(':appid')
  notify(@Req() req, @Res() res) {
    this.logger.log(`notifyHandle weixin data: ${JSON.stringify(req.weixin)}`);
    res.reply();
  }

  @ApiParam({ name: 'appid' })
  @Get(':appid')
  checkSignature() {
    return;
  }
}
