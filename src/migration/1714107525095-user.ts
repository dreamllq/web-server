import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1714107525095 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `password`(`id`,`password`) VALUES(\'d5d59889-dee0-4c05-bc86-793eadd7cca7\',\'8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92\')');
    await queryRunner.query('INSERT INTO `user`(`id`,`username`,`isActive`,`isSuper`,`passwordId`) VALUES(\'2952bdf9-a416-4ecc-bd65-0e8867dde069\',\'admin\',1,1,\'d5d59889-dee0-4c05-bc86-793eadd7cca7\')');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
