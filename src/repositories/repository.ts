import { Injectable } from '@nestjs/common';
import { DeviceRepository } from './device.repository';
import { LocationRepository } from './location.repository';
import { DeviceLocationRepository } from './device-location.repository';
import { OrganizationRepository } from './organization.repository';


@Injectable()
export class Repository {
  constructor(
    public readonly deviceRepository: DeviceRepository,
    public readonly locationRepository: LocationRepository,
    public readonly deviceLocationRepository: DeviceLocationRepository,
    public readonly organizationRepository: OrganizationRepository,
  ) { }
}
