import {
    BASE_ENTITY_DOMAIN,
    TABLE_NAMES_WITH_PREFIX,
} from '../../../src/utils/constants/common.constant';
import { Column, Entity, OneToMany } from 'typeorm';

import { CommonEntity } from './base/common.entity';
import { DeviceLocation } from './device-location';

@Entity({ name: TABLE_NAMES_WITH_PREFIX.LOCATION })
export class Location extends CommonEntity {
    @Column({
        name: BASE_ENTITY_DOMAIN.LOCATION_COLUMNS.NAME,
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @OneToMany(() => DeviceLocation, (deviceLocation) => deviceLocation.location)
    deviceLocations: DeviceLocation[];
}
