import { Module } from '@nestjs/common';
import { Repository } from 'src/repositories/repository';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { RepositoryModule } from 'src/repositories/repository.module';
import { ConfigEnvironmentModule } from '../base/config/config-environment.base.module';
import { CronJobService } from './cron-job.service';

@Module({
    imports: [EventEmitterModule, RepositoryModule, ConfigEnvironmentModule],
    providers: [CronJobService, Repository],
    exports: [CronJobService],
})
export class CronJobModule { }
