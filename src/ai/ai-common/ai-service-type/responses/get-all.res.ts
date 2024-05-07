import { AiServiceType } from '../entities/ai-service-type.entity';

export class AiServiceTypeGetAllResponse {
  code: number;
  message: string;
  data: AiServiceType[];
}