import { Injectable, Logger } from '@nestjs/common';
import ocr_api20210707, * as $ocr_api20210707 from '@alicloud/ocr-api20210707';
import * as $OpenApi from '@alicloud/openapi-client';
import * as $Util from '@alicloud/tea-util';
import { AiAliyunOcrService } from './ai-aliyun-ocr.service';
import Stream from '@alicloud/darabonba-stream';
import { OcrOperates } from './constants/ocr-operate';

@Injectable()
export class AiAliyunOcrSdkService {
  private logger = new Logger('AiAliyunOcrSdkService');

  constructor(
    private readonly aiAliyunOcrService: AiAliyunOcrService
  ) {}

  createClient(options: {accessKey:string, secretKey: string}): ocr_api20210707 {
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
    // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
    const config = new $OpenApi.Config({
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
      accessKeyId: options.accessKey,
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
      accessKeySecret: options.secretKey
    });
    // Endpoint 请参考 https://api.aliyun.com/product/ocr-api
    config.endpoint = 'ocr-api.cn-hangzhou.aliyuncs.com';
    return new ocr_api20210707(config);
  }

  async ocrOperate(options:{ocrId: string}) {
    const ocrTask = await this.aiAliyunOcrService.findOne(options.ocrId);
    if (ocrTask.type === OcrOperates.RecognizeAllText) {
      return this.recognizeAllText(options);
    }
  } 

  async recognizeAllText(options:{ocrId: string}) {
    this.logger.log(`[recognizeAllText] options: ${JSON.stringify(options)}`);
    const ocrTask = await this.aiAliyunOcrService.findOne(options.ocrId, { relationFileBuffer: true });
    const client = this.createClient({
      accessKey: ocrTask.account.accessKey,
      secretKey: ocrTask.account.secretKey
    });
    this.logger.log(`[recognizeAllText] ocrTask: ${JSON.stringify(ocrTask)}`);
    const bodyStream = Stream.readFromBytes(ocrTask.recognizeAllText.file.content.buffer);
    const recognizeAllTextRequest = new $ocr_api20210707.RecognizeAllTextRequest({
      body: bodyStream,
      type: ocrTask.recognizeAllText.type
    });
    const runtime = new $Util.RuntimeOptions({ });
    try {
      // 复制代码运行请自行打印 API 的返回值
      const res = await client.recognizeAllTextWithOptions(recognizeAllTextRequest, runtime);
      await this.aiAliyunOcrService.saveResult(options.ocrId, JSON.stringify(res.body));  
      this.logger.log(`[recognizeAllText][success] ${JSON.stringify(res, null, 2)}`);
    } catch (error) {
      // 此处仅做打印展示，请谨慎对待异常处理，在工程项目中切勿直接忽略异常。
      await this.aiAliyunOcrService.saveResult(options.ocrId, JSON.stringify(error));  
      this.logger.error(`[recognizeAllText][error] ${JSON.stringify(error, null, 2)}`);
      throw error;
    } 
  }
}