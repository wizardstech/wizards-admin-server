import { DiscoveredMethodWithMeta } from '@nestjs-plus/discovery';
import { UserController } from '@/modules/user/user.controller';

export const extractPermissions = (methods: DiscoveredMethodWithMeta<unknown>[]) => methods.map(method => {
  const action = method.meta;
  method.discoveredMethod.handler
  const controller = method.discoveredMethod.parentClass.injectType;
  const namespace = Reflect.getMetadata('namespace', controller);
  const feature = Reflect.getMetadata('path', controller);
  const permission = `${namespace}.${feature}.${action}`.toLowerCase();

  const validatePermission = (key, value) => {
    if (!value) {
      throw new Error(`[permission][${permission}] ${key} ${value} not found`)
    }
  }

  validatePermission('namespace', namespace);
  validatePermission('feature', feature);
  return permission;
});
