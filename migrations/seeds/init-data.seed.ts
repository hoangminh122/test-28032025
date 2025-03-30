import { DeepPartial, In, MigrationInterface, QueryRunner } from 'typeorm';
import * as data from '../../db/data.json';
import { Device, Location, Organization } from '../../src/repositories/entities';
import { DEVICE_STATUS } from '../../src/utils/enums/device.enum';
import { TABLE_NAMES_WITH_PREFIX } from 'src/utils/constants/common.constant';

const devices: DeepPartial<Device & { locationId: number }>[] = data.devices.map((device) => {
    return { type: device.type, serial: device.serial, status: device.status as DEVICE_STATUS, locationId: device.location_id, id: Number(device.id) };
});
const locations: DeepPartial<Device>[] = data.locations;
const organizations: DeepPartial<Device>[] = data.organizations;

export class InitData1728276856650 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const [isExistOrganization, isExistLocations, isExistDevices] = await Promise.all([
            queryRunner.manager.count(TABLE_NAMES_WITH_PREFIX.ORGANIZATION),
            queryRunner.manager.count(TABLE_NAMES_WITH_PREFIX.LOCATION),
            queryRunner.manager.count(TABLE_NAMES_WITH_PREFIX.DEVICE),
        ]);

        console.log(isExistOrganization);
        if (isExistOrganization === 0) {
            await queryRunner.manager.save(TABLE_NAMES_WITH_PREFIX.ORGANIZATION, organizations);
        }

        if (isExistLocations === 0) {
            await queryRunner.manager.save(TABLE_NAMES_WITH_PREFIX.LOCATION, locations);
        }

        if (isExistDevices === 0) {
            const deviceInserted = await queryRunner.manager.save(
                TABLE_NAMES_WITH_PREFIX.DEVICE,
                devices,
            );

            await queryRunner.manager.save(
                TABLE_NAMES_WITH_PREFIX.DEVICE_LOCATION,
                deviceInserted.map((device) => {
                    return { deviceId: device.id, locationId: devices.find(item => item.id === device.id).locationId };
                }),
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.delete(TABLE_NAMES_WITH_PREFIX.DEVICE_LOCATION, {});
        await queryRunner.manager.delete(TABLE_NAMES_WITH_PREFIX.DEVICE, {});
        await queryRunner.manager.delete(TABLE_NAMES_WITH_PREFIX.LOCATION, {});
        await queryRunner.manager.delete(TABLE_NAMES_WITH_PREFIX.ORGANIZATION, {});
    }
}
