import { MigrationInterface, QueryRunner } from 'typeorm';

export class AiAliyunAccount1715319890914 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `ai_aliyun_account`(`accessKey`,`secretKey`,`name`,`id`,`creatorId`) VALUES(\'' + atob('TFRBSTV0R1g3MmdFUEFNanppQVZkUzU4') + '\',\'' + atob('eGRZUFg3ejNMRWZUMkQ1Q0pBOEt2dTVKREQwdjht') + '\',\'llqtest\',\'d8bff5ed-6572-4610-a441-dbe1634c3e3e\',\'2952bdf9-a416-4ecc-bd65-0e8867dde069\');');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
