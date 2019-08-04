import { SetMetadata } from '@nestjs/common';

export enum RoleList {
  SUPER_ADMIN = 'super_admin',
  USER_EDITOR = 'user_editor',
  USER_VIEWER = 'user_viewer',
  USER_OWNER = 'user_owner',
  ROLE_EDITOR = 'role_editor',
  ROLE_VIEWER = 'role_viewer',
  ROLE_OWNER = 'role_owner',
}

export const Roles = (roles: RoleList[]) => SetMetadata('roles', roles);
