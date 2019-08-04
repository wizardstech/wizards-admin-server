import { EntitySchema, Connection } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export const dbInserter = async <T>(connection: Connection, entity: string | Function | EntitySchema<T>, values: QueryDeepPartialEntity<T> | QueryDeepPartialEntity<T>[]) => await connection
  .createQueryBuilder()
  .insert()
  .into(entity)
  .values(values)
  .execute();
