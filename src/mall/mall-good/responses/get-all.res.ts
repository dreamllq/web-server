import { MallGood } from '../mall-good.entity';

export class MallGoodGetAllResponse {
  code: number;
  message: string;
  data: MallGood[];
}