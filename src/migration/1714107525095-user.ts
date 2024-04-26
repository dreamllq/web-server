import { MigrationInterface, QueryRunner } from 'typeorm';

const user = [];

export class User1714107525095 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `user`(`id`,`username`,`isActive`,`isSuper`,`passwordId`) VALUES(\'2952bdf9-a416-4ecc-bd65-0e8867dde069\',\'admin\',1,1,\'d5d59889-dee0-4c05-bc86-793eadd7cca7\')');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
