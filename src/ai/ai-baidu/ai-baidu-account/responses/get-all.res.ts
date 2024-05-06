import { AiBaiduAccount } from '../entities/ai-baidu-account.entity';

export class AiBaiduAccountGetAllResponse {
  code: number;
  message: string;
  data: AiBaiduAccount[];
}