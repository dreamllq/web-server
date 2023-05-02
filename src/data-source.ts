import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '39.101.77.81',
  port: 7897,
  username: 'root',
  password: '123456',
  database: 'test',
  'entities': [],
  'migrations': ['src/migration/*{.ts,.js}']
});