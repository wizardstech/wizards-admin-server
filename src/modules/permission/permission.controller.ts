import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiUseTags } from '@nestjs/swagger';

import { Permission } from '@/entities/permission.entity';
import { PermissionService } from './permission.service';
import { Namespace, NamespaceList } from '@/decorators/namespace.decorator';
import { Roles, RoleList } from '@/decorators/roles.decorator';
import { ACLGuard } from '@/guards/acl.guard';

@Namespace(NamespaceList.IAM)
@Crud({
  model: {
    type: Permission,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    getManyBase: {
      decorators: [Roles([RoleList.SUPER_ADMIN]), UseGuards(ACLGuard)]
    }
  }
})
@ApiUseTags('permissions')
@Controller('permissions')
export class PermissionController {
  constructor(public service: PermissionService) {}
}
