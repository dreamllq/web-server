import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBiDataViewDto } from './dto/create-bi-data-view.dto';
import { UpdateBiDataViewDto } from './dto/update-bi-data-view.dto';
import { BiDataMetaService } from '../bi-data-meta/bi-data-meta.service';
import { BiDataRuleType } from '../bi-data-rule/constants/bi-data-rule-type';
import { File } from 'src/file/file.entity';
import { FileService } from 'src/file/file.service';
import * as ExcelJS from 'exceljs';

@Injectable()
export class BiDataViewService {

  constructor(private readonly biDataMetaService: BiDataMetaService, 
    private readonly fileService: FileService) {}

  async view(metaId:string) {
    const biDataMeta = await this.biDataMetaService.findOne(metaId);

    if (biDataMeta.rule?.type === BiDataRuleType.EXCEL) {
      const data = await this.formatExcel(biDataMeta.rule?.excelFile);

      biDataMeta.structs.forEach((struct, index) => {
        data.columns[index].struct = struct;
        data.columns[index].headerName = struct.name;
      });
      return data;
    } else if (biDataMeta.rule?.type === BiDataRuleType.SQL) {

    }

    return biDataMeta;
  }

  private numberToExcelColumn(num:number) {
    let column = '';
    while (num > 0) {
      num--; // 因为Excel列是从1开始计数的，而我们的计算从0开始
      const remainder = num % 26;
      column = String.fromCharCode(65 + remainder) + column;
      num = Math.floor(num / 26);
    }
    return column;
  }
  private async formatExcel(file: File) {
    const f = await this.fileService.findOne(file.id, { relations: { content: true } });
    const workbook = new ExcelJS.Workbook();
    // const buffer = await f.content.buffer.arrayBuffer();
    await workbook.xlsx.load(f.content.buffer);
    if (workbook.worksheets.length === 0) {
      throw new BadRequestException('Excel file is empty');
    }
    const sheet = workbook.worksheets[0];
    
    const columns = [];
    const columnCount = sheet.columnCount;

    for (let i = 1; i <= columnCount; i++) {
      columns.push({
        field: this.numberToExcelColumn(i),
        headerName: this.numberToExcelColumn(i)
      });
    }

    const data = [];
    sheet.eachRow((row) => {
      const eRow:{[index: string]: ExcelJS.CellValue} = {};
      row.eachCell((cell) => {
        eRow[this.numberToExcelColumn(cell.fullAddress.col)] = cell.text;
      });
      data.push(eRow);
    });

    return {
      columns,
      data
    };
  }
}
