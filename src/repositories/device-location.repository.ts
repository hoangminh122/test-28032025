import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryBase } from 'src/_core/repository.base';
import { Repository } from 'typeorm';
import { Device, Location } from './entities';
import { DeviceLocation } from './entities/device-location';

@Injectable()
export class DeviceLocationRepository extends RepositoryBase<DeviceLocation> {
  constructor(
    @InjectRepository(DeviceLocation)
    public repository: Repository<DeviceLocation>,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {
    super(repository);
  }

  async createDeviceLocation(deviceId: number, locationId: number): Promise<DeviceLocation> {
    const device = await this.deviceRepository.findOne({ where: { id: deviceId } });
    const location = await this.locationRepository.findOne({ where: { id: locationId } });

    if (!device || !location) {
      throw new Error('Device or Location not found');
    }

    const deviceLocation = this.repository.create({
      device,
      location,
    });

    return this.repository.save(deviceLocation);
  }
}
