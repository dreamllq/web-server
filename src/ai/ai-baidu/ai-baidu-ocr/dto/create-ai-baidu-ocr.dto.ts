import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OcrOperates } from '../constants/ocr-operate';
import { GeneralScenariosType } from '../constants/general-scenarios-type';

class GeneralScenarios {
  @ApiProperty({
    description: '识别类型',
    enum: GeneralScenariosType,
    required: true,
    enumName: 'BaiduGeneralScenariosType'
  })
    type:GeneralScenariosType;

  @ApiProperty({ description: '文件' })
  @IsNotEmpty()
  @IsString()
    fileId:string;

  @ApiProperty({ description: '识别文件页码' })
  @IsNotEmpty()
  @IsNumber()
    fileNumber:string; 
}

export class CreateAiBaiduOcrDto {
  @ApiProperty({ description: '名称' })
  @IsNotEmpty()
  @IsString()
    name:string;

  @ApiProperty({ description: '账号信息' })
  @IsNotEmpty()
  @IsString()
    accountId: string;

  @ApiProperty({
    description: '操作方法',
    type: 'enum',
    enum: OcrOperates,
    enumName: 'BaiduOcrOperates'
  })
  @IsNotEmpty()
  @IsString()
    type:OcrOperates;

  @ApiProperty({ type: GeneralScenarios })
    generalScenarios:GeneralScenarios;
}
