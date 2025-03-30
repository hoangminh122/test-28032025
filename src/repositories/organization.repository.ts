import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryBase } from 'src/_core/repository.base';
import { Repository } from 'typeorm';
import { Device, Organization } from './entities';

@Injectable()
export class OrganizationRepository extends RepositoryBase<Organization> {
  constructor(
    @InjectRepository(Organization)
    public repository: Repository<Organization>,
  ) {
    super(repository);
  }
}
