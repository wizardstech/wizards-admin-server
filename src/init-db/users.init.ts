import { User } from "@/entities/user.entity";
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export const users: QueryDeepPartialEntity<User>[] = [
  {
    firstname: 'john',
    lastname: 'doe',
    email: 'jdoe@example.com',
    username: 'jdoe',
    password: 'adminadmin',
  }
];
