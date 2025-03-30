import {
  BASE_ENTITY_DOMAIN,
  TABLE_NAMES_WITH_PREFIX,
} from '../../../src/utils/constants/common.constant';
import { Column, Entity, OneToMany } from 'typeorm';

import { CommonEntity } from './base/common.entity';
import { DEVICE_STATUS } from '../../../src/utils/enums/device.enum';
import { DeviceLocation } from './device-location';

@Entity({ name: TABLE_NAMES_WITH_PREFIX.DEVICE })
export class Device extends CommonEntity {
  @Column({
    name: BASE_ENTITY_DOMAIN.DEVICE_COLUMNS.TYPE,
    type: 'varchar',
    nullable: false,
  })
  type: string;

  @Column({
    name: BASE_ENTITY_DOMAIN.DEVICE_COLUMNS.SERIAL,
    type: 'varchar',
    nullable: false,
  })
  serial: string;

  @Column({
    name: BASE_ENTITY_DOMAIN.DEVICE_COLUMNS.STATUS,
    type: 'varchar',
    length: 20,
    default: DEVICE_STATUS.UNACTIVE,
    nullable: false,
  })
  status: DEVICE_STATUS;

  @OneToMany(() => DeviceLocation, (deviceLocation) => deviceLocation.device)
  deviceLocations: DeviceLocation[];
}
