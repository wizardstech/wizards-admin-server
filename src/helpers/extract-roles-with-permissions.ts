import { getAction } from '@nestjsx/crud';
import { toPairs, groupBy, flatten, uniq } from 'lodash';
import { DiscoveredMethodWithMeta } from '@nestjs-plus/discovery';

export interface RolesWithPermissions {
  role: string;
  permissions: string[];
}

export const extractRolesWithPermissions = (methodsWithRoles: DiscoveredMethodWithMeta<unknown>[]): RolesWithPermissions[] => {
  const rolesWithPermissionsTmp = flatten(methodsWithRoles.map(item => {
    const controller = item.discoveredMethod.parentClass.injectType;
    const namespace = Reflect.getMetadata('namespace', controller);
    const feature = Reflect.getMetadata('path', controller);
    const action = getAction(item.discoveredMethod.handler);
    const permission = `${namespace}.${feature}.${action}`.toLowerCase();
    const rolesList = item.meta as string[];
    return rolesList.map(item => ({ role: item, permission }))
  }));

  const rolesWithPermissions = toPairs(groupBy(rolesWithPermissionsTmp, item => item.role))
    .map(item => ({ role: item[0], permissions: uniq(item[1].map(item2 => item2.permission)) }));

  return rolesWithPermissions;
}
