import { MigrationInterface, QueryRunner } from 'typeorm';

export class AiAliyunService1716347632052 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `ai_aliyun_service`(`id`,`name`,`endpoint`,`path`,`typeId`,`creatorId`,`model`) VALUES(\'65307737-377a-4cba-8d3e-086abc5a05be\',\'通义千问-Max\',\'https://dashscope.aliyuncs.com\',\'/api/v1/services/aigc/text-generation/generation\',\'49197683-2c76-4db5-aa39-28950c25d013\',\'2952bdf9-a416-4ecc-bd65-0e8867dde069\',\'qwen-max\');');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
