import {
    BASE_ENTITY_DOMAIN,
    TABLE_NAMES_WITH_PREFIX,
} from '../../../src/utils/constants/common.constant';
import { Column, Entity } from 'typeorm';

import { CommonEntity } from './base/common.entity';

@Entity({ name: TABLE_NAMES_WITH_PREFIX.ORGANIZATION })
export class Organization extends CommonEntity {
    @Column({
        name: BASE_ENTITY_DOMAIN.ORGANIZATION_COLUMNS.NAME,
        type: 'varchar',
        nullable: false,
    })
    name: string;


}
