import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleList, Roles } from '@/decorators/roles.decorator';
import { ACLGuard } from '@/guards/acl.guard';

export const getIAMGuards = (roles: RoleList[]) => [ApiBearerAuth(), Roles(roles), UseGuards(AuthGuard('jwt'), ACLGuard)]
