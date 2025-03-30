import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/base/database/database.base.module';
import { DeviceModule } from './modules/device/device.module';
import { RepositoryModule } from './repositories/repository.module';
import { CronJobModule } from './modules/cron-job/cron-job.module';
import { CronJobService } from './modules/cron-job/cron-job.service';
import { ConfigEnvironmentModule } from './modules/base/config/config-environment.base.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule, DeviceModule, RepositoryModule, ConfigEnvironmentModule],
  controllers: [],
  providers: [CronJobService],
})
export class AppModule { }
