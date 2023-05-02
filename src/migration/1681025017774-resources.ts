import { MigrationInterface, QueryRunner } from 'typeorm';
const resources = [
  [
    '885e816b-0445-4167-9281-97d00db2f009',
    '用户管理-查询',
    'users-read'
  ],
  [
    '1a02c809-a113-43fe-b548-5ff20cc16cc3',
    '用户管理-创建',
    'users-create'
  ],
  [
    '5df471d4-c807-45d0-bcc2-df353bec6d86',
    '用户管理-更新',
    'users-update'
  ],
  [
    '94827897-f555-4276-a737-bf70b5aa5a3c',
    '用户管理-删除',
    'users-delete'
  ]
];
export class resources1681025017774 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(resources.map(resource => queryRunner.query('INSERT INTO `resource` (`id`,`name`, `key`) VALUES (?, ?, ?)', resource)));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
