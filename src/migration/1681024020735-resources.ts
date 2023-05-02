import { MigrationInterface, QueryRunner } from 'typeorm';
const resources = [
  [
    '6be9e955-a985-40a1-a788-e343ac4cf520',
    '角色管理-查询',
    'roles-read'
  ],
  [
    'c43e3330-69a5-412f-b3ee-01055ab5060b',
    '角色管理-创建',
    'roles-create'
  ],
  [
    '209887f6-cc52-49c9-b0df-5d36b270033d',
    '角色管理-更新',
    'roles-update'
  ],
  [
    '3a948341-5e47-41d5-b746-fa9ccb247867',
    '角色管理-删除',
    'roles-delete'
  ]
];

export class resources1681024020735 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(resources.map(resource => queryRunner.query('INSERT INTO `resource` (`id`,`name`, `key`) VALUES (?, ?, ?)', resource)));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
