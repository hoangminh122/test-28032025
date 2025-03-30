import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryBase } from 'src/_core/repository.base';
import { Repository } from 'typeorm';
import { Device } from './entities';

@Injectable()
export class DeviceRepository extends RepositoryBase<Device> {
  constructor(
    @InjectRepository(Device)
    public repository: Repository<Device>,
  ) {
    super(repository);
  }
}
