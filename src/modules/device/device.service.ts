import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Repository } from 'src/repositories/repository';
import { CronJobService } from '../cron-job/cron-job.service';

@Injectable()
export class DeviceService {
    constructor(
        private model: Repository,
        @Inject(REQUEST) public readonly req: Request,
        private readonly cronJobService: CronJobService
    ) {
    }
    async syncFromCloud(
    ) {
        console.log(
            `[${DeviceService.name}][syncFromCloud]`,
        );
        return this.cronJobService.syncFromCloud();
    }
}

