import { flattenDeep } from 'lodash';
import { permissionsObj, Verbs } from '@/modules/permission/permissions';

export const permissions = flattenDeep(permissionsObj.map(permission => permission.resources.map(resource => {
  const defaultPermissions = Object.values(Verbs).map(verb => `${permission.service}.${resource.name}.${verb}`);
  const customPermissions = resource.verbs ? resource.verbs.map(verb => `${permission.service}.${resource.name}.${verb}`) : [];
  return [...defaultPermissions, ...customPermissions];
}))).map((permission: any) => ({ name: permission }));

