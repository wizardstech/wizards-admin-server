import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DiscoveryModule, DiscoveryService } from '@nestjs-plus/discovery';
import { uniq, flatten, groupBy, toPairs } from 'lodash';

import { Config } from './config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';
import { initDB } from './init-db';
import { extractPermissions } from './helpers/extract-permissions';
import { getAction } from '@nestjsx/crud';
import { extractRolesWithPermissions } from './helpers/extract-roles-with-permissions';


const dbParams: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Config.POSTGRES_PORT,
  username: Config.POSTGRES_USER,
  password: Config.POSTGRES_PASSWORD,
  database: Config.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: Config.IS_DEV
};

@Module({
  imports: [
    DiscoveryModule,
    TypeOrmModule.forRoot(dbParams),
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule
  ]
})
export class AppModule implements OnModuleInit {
  constructor(private readonly connection: Connection, private readonly discover: DiscoveryService) {}

  async onModuleInit() {
    const methodsWithPermission = await this.discover.controllerMethodsWithMetaAtKey('NESTJSX_ACTION_NAME_METADATA');
    const methodsWithRoles = await this.discover.controllerMethodsWithMetaAtKey('roles');
    const roles = uniq(flatten(methodsWithRoles.map(item => item.meta as string[])));
    const permissions = extractPermissions(methodsWithPermission);
    const rolesWithPermissions = extractRolesWithPermissions(methodsWithRoles);
    initDB({ connection: this.connection, permissions, roles, rolesWithPermissions });
  }
}
