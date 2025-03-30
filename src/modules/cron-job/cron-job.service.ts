import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Repository } from 'src/repositories/repository';
import { FetchUtil } from 'src/utils/fetch.util';
import { ConfigEnvironmentService } from '../base/config/config-environment.base.service';
import async from 'async';
import { CRON_EXPRESSION, LIMIT_SYNC_DATA } from 'src/utils/constants/cron-job.constant';
import { Device } from 'src/repositories/entities';
import { TABLE_NAMES_WITH_PREFIX } from 'src/utils/constants/common.constant';
import { DeepPartial, In, LessThanOrEqual, MigrationInterface, QueryRunner } from 'typeorm';
import { DEVICE_STATUS } from 'src/utils/enums/device.enum';
import { Cron } from '@nestjs/schedule';
@Injectable()
export class CronJobService {
    constructor(
        private model: Repository,
        @Inject(REQUEST) public readonly req: Request,
        private readonly fetchUtil: FetchUtil,
        private configEnvironmentService: ConfigEnvironmentService,
    ) { }

    @Cron(CRON_EXPRESSION.UPDATE_LIST_DEVICE)
    async syncFromCloud() {
        console.log(`[${CronJobService.name}][syncFromCloud schedule executed]`);

        const listDeviceSync = await this.fetchUtil.get(
            this.configEnvironmentService.get('URL_SYNC_DATA'),
        );
        const devices: DeepPartial<Device & { locationId: number }>[] = (
            listDeviceSync.data as Array<Device & { location_id: number }>
        ).map((device) => {
            return {
                type: device.type,
                serial: device.serial,
                status: device.status as DEVICE_STATUS,
                locationId: device.location_id,
            };
        });
        await async.eachLimit(
            devices,
            LIMIT_SYNC_DATA,
            async (item: Device & { locationId: number }) => {
                const queryRunner =
                    this.model.deviceRepository.repository.manager.connection.createQueryRunner();
                try {
                    // Start the transaction
                    await queryRunner.startTransaction();

                    const location = await queryRunner.manager.findOne(TABLE_NAMES_WITH_PREFIX.LOCATION, {
                        where: {
                            id: item.locationId,
                        },
                    });

                    if (location) {
                        const deviceFind = (await queryRunner.manager.findOne(TABLE_NAMES_WITH_PREFIX.DEVICE, {
                            where: {
                                serial: item.serial,
                                updatedAt: LessThanOrEqual(new Date()),
                            },
                        })) as Device;

                        if (deviceFind) {
                            const deviceUpdate = Object.assign(deviceFind, {
                                type: item.type,
                                status: item.status,
                            });
                            await Promise.all([
                                queryRunner.manager.save(deviceUpdate),
                                queryRunner.manager.update(
                                    TABLE_NAMES_WITH_PREFIX.DEVICE_LOCATION,
                                    { id: deviceUpdate.id },
                                    { locationId: item.locationId },
                                ),
                            ]);
                        }
                    }

                    await queryRunner.commitTransaction();

                    return true;
                } catch (error) {
                    await queryRunner.rollbackTransaction();
                    throw error;
                } finally {
                    await queryRunner.release();
                }
            },
        );
    }
}
