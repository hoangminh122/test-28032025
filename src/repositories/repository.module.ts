import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEnvironmentService } from 'src/modules/base/config/config-environment.base.service';
import { UtilsModule } from 'src/utils/utils.module';
import { Device, Location, Organization } from './entities';
import { DeviceLocation } from './entities/device-location';
import { DeviceRepository } from './device.repository';
import { LocationRepository } from './location.repository';
import { DeviceLocationRepository } from './device-location.repository';
import { OrganizationRepository } from './organization.repository';
import { Repository } from './repository';

@Global()
@Module({
  imports: [
    UtilsModule,
    TypeOrmModule.forFeature([Device, Location, DeviceLocation, Organization]),
  ],
  providers: [
    DeviceRepository,
    LocationRepository,
    DeviceLocationRepository,
    OrganizationRepository,
    Repository
  ],
  exports: [DeviceRepository, LocationRepository, DeviceLocationRepository, OrganizationRepository, Repository],
})
export class RepositoryModule { }
