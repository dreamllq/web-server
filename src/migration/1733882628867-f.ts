import { MigrationInterface, QueryRunner } from 'typeorm';

export class F1733882628867 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `f`(`id`,`name`,`creatorId`,`pathType`) VALUES(\'708c1265-222e-4609-b8cb-881d3de1994b\',\'HD\',\'2952bdf9-a416-4ecc-bd65-0e8867dde069\',\'dir\')');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
