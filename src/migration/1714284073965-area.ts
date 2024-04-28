import { MigrationInterface, QueryRunner } from 'typeorm';
import './area_format_user.json';
import * as fs from 'fs';
import * as path from 'path';


export class Area1714284073965 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const content = fs.readFileSync(path.join(__dirname, 'area_format_user.json'), 'utf-8');
    const areas = JSON.parse(content);
    await areas.reduce(async (acc, area, index) => {
      await acc;
      console.log(`${index}/${areas.length}`);
      return queryRunner.query('INSERT INTO `area`(`id`,`parentId`,`deep`,`name`,`pinyinPrefix`,`pinyin`,`extId`,`extName`) VALUES(?,?,?,?,?,?,?,?);', [
        Number(area.id),
        area.pid,
        area.deep,
        area.name,
        area.pinyin_prefix,
        area.pinyin,
        area.ext_id,
        area.ext_name
      ]);
    }, Promise.resolve());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
