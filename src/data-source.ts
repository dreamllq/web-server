import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '842bdf3688de.c.methodot.com',
  port: 31483,
  username: 'root',
  password: '123456',
  database: 'test',
  'entities': [],
  'migrations': ['src/migration/*{.ts,.js}']
});