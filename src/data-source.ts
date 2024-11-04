import { DataSource } from 'typeorm';
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config({ path: process.cwd() + '/.env' });
dotenvExpand.expand(myEnv);

const { LWS_MYSQL_HOST, LWS_MYSQL_PORT, LWS_MYSQL_USERNAME, LWS_MYSQL_PASSWORD, LWS_MYSQL_DATABASE } = myEnv.parsed;

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: LWS_MYSQL_HOST,
  port: Number(LWS_MYSQL_PORT),
  username: LWS_MYSQL_USERNAME,
  password: LWS_MYSQL_PASSWORD,
  database: LWS_MYSQL_DATABASE,
  'entities': [],
  'migrations': [__dirname + '/migration/*.js']
});