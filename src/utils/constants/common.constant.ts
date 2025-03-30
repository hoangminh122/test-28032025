import { cloneDeep } from 'lodash';

const BASE_ENTITY_DOMAIN = {
  BASE_COLUMNS: {
    ID: 'id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    CREATED_BY: 'created_by',
    UPDATED_BY: 'updated_by',
    DELETED_AT: 'deleted_at',
    DELETED_BY: 'deleted_by',
  },
  DEVICE_COLUMNS: {
    TYPE: 'type',
    SERIAL: 'serial',
    STATUS: 'status',
    DESCRIPTION: 'description',
  },
  ORGANIZATION_COLUMNS: {
    NAME: 'name',
  },
  LOCATION_COLUMNS: {
    NAME: 'name',
  },
  DEVICE_LOCATION_COLUMNS: {
    DEVICE_ID: 'device_id',
    LOCATION_ID: 'location_id'
  },
} as const;

const TABLE_NAME_PREFIX = 'banking_';

const TABLE_NAMES = {
  DEVICE: 'devices',
  LOCATION: 'locations',
  ORGANIZATION: 'organizations',
  DEVICE_LOCATION: 'device_locations'
} as const;

const TABLE_NAMES_WITH_PREFIX = (() => {
  const result = cloneDeep(TABLE_NAMES);
  Object.keys(TABLE_NAMES).forEach((nameTable: string) => {
    result[nameTable] = `${TABLE_NAME_PREFIX}${result[nameTable]}`;
  });
  return result;
})();

const DEFAULT_EXCLUDE_QUERY_PARAMS = [
  'lang',
  'search',
  'sort',
  'select',
  'page',
  'limit',
];

export {
  BASE_ENTITY_DOMAIN,
  TABLE_NAMES,
  TABLE_NAMES_WITH_PREFIX,
  DEFAULT_EXCLUDE_QUERY_PARAMS,
};
