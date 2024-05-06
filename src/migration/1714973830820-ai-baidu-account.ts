import { MigrationInterface, QueryRunner } from 'typeorm';

export class AiBaiduAccount1714973830820 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `ai_baidu_account`(`accessKey`,`secretKey`,`name`,`id`,`creatorId`) VALUES(\'' + atob('QUxUQUs0Y1hKUlF4aUs5dTZ0bU9lalJuMU4=') + '\',\'' + atob('YjNmYmRkMWRhYzM4NDc5MmJhYjA3NjA3OTRmYjBkYzY=') + '\',\'llqtest\',\'d8bff5ed-6572-4610-a441-dbe1634c3e3e\',\'2952bdf9-a416-4ecc-bd65-0e8867dde069\');');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
