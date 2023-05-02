import { MigrationInterface, QueryRunner } from 'typeorm';
const resources = [
  [
    'a419fc35-6e06-4a62-a623-9bee69cb3107',
    '系统设置-查询',
    'setting-read'
  ],
  [
    'd5b2c7fe-e77e-4e09-8d94-4336276fdbaf',
    '系统设置-创建',
    'setting-create'
  ],
  [
    'd48463e0-ec6b-4d3d-9963-76e4632021cd',
    '系统设置-更新',
    'setting-update'
  ],
  [
    'f43f7beb-96ea-436c-92e8-5dc3d1a9ad44',
    '系统设置-删除',
    'setting-delete'
  ]
];

export class resources1681025378472 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(resources.map(resource => queryRunner.query('INSERT INTO `resource` (`id`,`name`, `key`) VALUES (?, ?, ?)', resource)));

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
