import { MigrationInterface, QueryRunner } from 'typeorm';

export class AiBaiduService1715063674016 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `ai_baidu_service`(`id`,`name`,`creatorId`,`path`,`typeId`,`endpoint`) VALUES(\'9a6779e1-f7a6-4021-be9c-f6ce5018c3e1\',\'ERNIE-Speed-8K\',\'2952bdf9-a416-4ecc-bd65-0e8867dde069\',\'/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie_speed\',\'49197683-2c76-4db5-aa39-28950c25d013\',\'https://aip.baidubce.com\');');

    await queryRunner.query('INSERT INTO `ai_baidu_service`(`id`,`name`,`endpoint`,`path`,`createDate`,`updateDate`,`typeId`,`creatorId`) VALUES(\'95d3db11-8d56-4cb9-8d9b-a571aaee5a8b\',\'Yi-34B-Chat\',\'https://aip.baidubce.com\',\'/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/yi_34b_chat\',\'2024-05-17 01:57:45.519141\',\'2024-05-17 01:57:45.519141\',\'49197683-2c76-4db5-aa39-28950c25d013\',\'2952bdf9-a416-4ecc-bd65-0e8867dde069\');');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
