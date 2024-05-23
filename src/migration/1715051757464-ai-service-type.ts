import { MigrationInterface, QueryRunner } from 'typeorm';

export class AiServiceType1715051757464 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `ai_service_type`(`id`,`name`, `value`) VALUES(\'49197683-2c76-4db5-aa39-28950c25d013\',\'文本对话\',\'CHAT\');');
    await queryRunner.query('INSERT INTO `ai_service_type`(`id`,`name`, `value`) VALUES(\'906006d9-3e3a-41e8-bae4-889d7e1861c6\',\'文本生图\',\'TEXT_TO_IMAGE\');');
    await queryRunner.query('INSERT INTO `ai_service_type`(`id`,`name`, `value`) VALUES(\'2e0d9549-0ef3-44b1-a7fc-422aef5d9551\',\'图像理解\',\'IMAGE_INFER\');');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
