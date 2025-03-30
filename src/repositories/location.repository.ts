import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryBase } from 'src/_core/repository.base';
import { Repository } from 'typeorm';
import { Device, Location } from './entities';

@Injectable()
export class LocationRepository extends RepositoryBase<Location> {
  constructor(
    @InjectRepository(Location)
    public repository: Repository<Location>,
  ) {
    super(repository);
  }
}
