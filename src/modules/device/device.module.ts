import { Module } from '@nestjs/common';
import { Repository } from 'src/repositories/repository';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { RepositoryModule } from 'src/repositories/repository.module';
import { ConfigEnvironmentModule } from '../base/config/config-environment.base.module';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { CronJobModule } from '../cron-job/cron-job.module';

@Module({
    imports: [EventEmitterModule, RepositoryModule, ConfigEnvironmentModule, CronJobModule],
    controllers: [DeviceController],
    providers: [DeviceService, Repository],
})
export class DeviceModule { }
