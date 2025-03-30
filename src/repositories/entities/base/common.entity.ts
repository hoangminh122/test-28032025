import { PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

export class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}