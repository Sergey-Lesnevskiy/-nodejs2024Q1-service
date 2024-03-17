import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
};
