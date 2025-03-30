import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

import { ConfigEnvironmentService } from '../../modules/base/config/config-environment.base.service';
import { Device, Location, Organization } from '../../../src/repositories/entities';
import { DeviceLocation } from '../../../src/repositories/entities/device-location';

dotenvConfig({ path: '.env' });
export const TYPEORM_CONFIG = {
  type: 'mysql',
  host: ConfigEnvironmentService.getIns().get('MYSQL_HOST') || '127.0.0.1',
  port: Number(ConfigEnvironmentService.getIns().get('MYSQL_PORT')) || 3306,
  username: ConfigEnvironmentService.getIns().get('MYSQL_USER') || '',
  password: ConfigEnvironmentService.getIns().get('MYSQL_PASSWORD') || '',
  database: ConfigEnvironmentService.getIns().get('MYSQL_DATABASE') || '',
  // entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/*/*.entity{.ts,.js}'],
  entities: [Device, Location, DeviceLocation, Organization],
  migrations: ['dist/migrations/seeds/*{.ts,.js}'],
  // synchronize: true,
  logging: true,
  // migrationsRun: true,
  // dropSchema: true,
  extra: { charset: 'utf8mb4' },
} as TypeOrmModuleOptions;

export default registerAs('typeorm', () => TYPEORM_CONFIG);
export const connectionSource = new DataSource(
  TYPEORM_CONFIG as DataSourceOptions,
);
