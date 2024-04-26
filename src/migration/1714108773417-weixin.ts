import { MigrationInterface, QueryRunner } from 'typeorm';

export class Weixin1714108773417 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `weixin`(`id`,`name`,`appid`,`appSecret`,`appType`) VALUES(\'1c81e306-bc24-4926-9332-203e8594cea8\',\'微信测试\',\'wx8072c0c623334d0b\',\'5891403666796c6225f88b672d7e25fb\',\'official_account\');');

    await queryRunner.query('INSERT INTO `weixin_official_account_config`(`id`,`token`,`checkSignature`,`weixinId`) VALUES(\'63850d03-3f69-4e78-a2f5-2fc9e29d74da\',\'some token\',0,\'1c81e306-bc24-4926-9332-203e8594cea8\');');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
