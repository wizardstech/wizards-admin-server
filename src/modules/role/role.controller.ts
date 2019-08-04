import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ApiUseTags } from '@nestjs/swagger';

import { Role } from '@/entities/role.entity';
import { RoleService } from './role.service';
import { Namespace, NamespaceList } from '@/decorators/namespace.decorator';
import { RoleList, Roles } from '@/decorators/roles.decorator';
import { ACLGuard } from '@/guards/acl.guard';

@Namespace(NamespaceList.IAM)
@Crud({
  model: {
    type: Role,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      permissions: {}
    }
  },
  routes: {
    getManyBase: {
      decorators: [Roles([RoleList.SUPER_ADMIN, RoleList.ROLE_VIEWER, RoleList.ROLE_VIEWER]), UseGuards(ACLGuard)]
    }
  }
})
@ApiUseTags('roles')
@Controller('roles')
export class RoleController {
  constructor(public service: RoleService) {}
}
