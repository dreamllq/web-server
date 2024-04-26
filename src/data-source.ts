import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'd859a673fcb2.c.methodot.com',
  port: 30486,
  username: 'root',
  password: '123456',
  database: 'test',
  'entities': [],
  'migrations': [__dirname + '/migration/*.js']
});