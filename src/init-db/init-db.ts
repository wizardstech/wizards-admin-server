import { Connection, In } from 'typeorm';

import { dbInserter } from '@/helpers/db-inserter';
import { Permission } from '@/entities/permission.entity';
import { User } from '@/entities/user.entity';
import { users } from './users.init';
import { Role } from '@/entities/role.entity';
import { RolesWithPermissions } from '@/helpers/extract-roles-with-permissions';
import { RoleList } from '@/decorators/roles.decorator';

interface InitDBConfig {
  connection: Connection,
  permissions: string[],
  roles: string[],
  rolesWithPermissions: RolesWithPermissions[]
}

export const initDB = async ({
  connection,
  permissions,
  roles,
  rolesWithPermissions
}: InitDBConfig) => {
  await dbInserter<Permission>(connection, Permission, permissions.map(item => ({ name: item })));
  await dbInserter<Role>(connection, Role, roles.map(item => ({ name: item })));
  await dbInserter<User>(connection, User, users)

  const permissionRepository = await connection.getRepository(Permission);
  const roleRepository = await connection.getRepository(Role);
  const userRepository = await connection.getRepository(User);

  rolesWithPermissions.map(async item => {
    const itemPermissions = await permissionRepository.find({ name: In(item.permissions) })
    const role = await roleRepository.findOne({ name: item.role })
    if (!Array.isArray(role.permissions)) {
      role.permissions = [];
    }
    role.permissions.push(...itemPermissions);
    await roleRepository.save(role);
  });


  const superAdminUser = await userRepository.findOne({ email: 'jdoe@example.com' });
  const superAdminRole = await roleRepository.findOne({ name: RoleList.SUPER_ADMIN });
  if (!Array.isArray(superAdminUser.roles)) {
    superAdminUser.roles = [];
  }
  superAdminUser.roles.push(superAdminRole);
  await userRepository.save(superAdminUser);
}
