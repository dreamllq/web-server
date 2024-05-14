import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OcrOperates } from '../constants/ocr-operate';
import { RecognizeAllTextType } from '../constants/orc-recognize-all-text-type';

class RecognizeAllText {
  @ApiProperty({
    description: '识别类型',
    enum: RecognizeAllTextType,
    required: true,
    enumName: 'RecognizeAllTextType'
  })
    type:RecognizeAllTextType;
}

export class CreateAiAliyunOcrDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty()
  @IsString()
    name:string;

  @ApiProperty({ description: '账号信息' })
  @IsNotEmpty()
  @IsString()
    accountId: string;

  @ApiProperty({ description: '文件' })
  @IsNotEmpty()
  @IsString()
    fileId:string;

  @ApiProperty({
    description: '操作方法',
    type: 'enum',
    enum: OcrOperates 
  })
  @IsNotEmpty()
  @IsString()
    type:OcrOperates;

  @ApiProperty({ type: RecognizeAllText })
    recognizeAllText:RecognizeAllText;
}
