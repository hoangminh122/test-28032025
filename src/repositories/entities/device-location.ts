import { BASE_ENTITY_DOMAIN, TABLE_NAMES_WITH_PREFIX } from "../../../src/utils/constants/common.constant";
import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { CommonEntity } from "./base/common.entity";
import { Organization } from "./organization.entity";
import { Device } from "./device.entity";
import { Location } from "./location.entity";


@Entity({ name: TABLE_NAMES_WITH_PREFIX.DEVICE_LOCATION })
@Unique(['device', 'location'])
export class DeviceLocation extends CommonEntity {
  @JoinColumn({ name: BASE_ENTITY_DOMAIN.DEVICE_LOCATION_COLUMNS.DEVICE_ID })
  @ManyToOne(() => Device, (device) => device.deviceLocations)
  device: Device;

  @Column({
    name: BASE_ENTITY_DOMAIN.DEVICE_LOCATION_COLUMNS.DEVICE_ID,
    type: 'bigint',
  })
  deviceId: number;

  @JoinColumn({ name: BASE_ENTITY_DOMAIN.DEVICE_LOCATION_COLUMNS.LOCATION_ID })
  @ManyToOne(() => Location, (location) => location.deviceLocations)
  location: Location;

  @Column({
    name: BASE_ENTITY_DOMAIN.DEVICE_LOCATION_COLUMNS.LOCATION_ID,
    type: 'bigint',
  })
  locationId: number;
}
