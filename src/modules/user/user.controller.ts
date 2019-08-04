import { Controller, Get, HttpStatus, Req, HttpException, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudRequestInterceptor, ParsedRequest, Feature, Action } from '@nestjsx/crud';

import { User } from '@/entities/user.entity';
import { UserService } from './user.service';
import { ACLGuard } from '@/guards/acl.guard';
import { Namespace, NamespaceList } from '@/decorators/namespace.decorator';
import { Roles, RoleList } from '@/decorators/roles.decorator';
import { getIAMGuards } from '@/helpers/get-iam-guards';

@Namespace(NamespaceList.IAM)
@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    exclude: ['password'],
    join: {
      roles: {},
      'roles.permissions': {}
    }
  },
  routes: {
    getManyBase: {
      decorators: getIAMGuards([RoleList.SUPER_ADMIN])
    },
    getOneBase: {
      decorators: getIAMGuards([RoleList.SUPER_ADMIN])
    }
  }
})
@ApiUseTags('users')
@Controller('users')
export class UserController {
  constructor(public service: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Get user information' })
  @ApiResponse({ status: HttpStatus.OK, description: 'success', type: User })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'unauthorized' })
  @UseInterceptors(CrudRequestInterceptor)
  @Action('Read-Me')
  async find(@ParsedRequest() req): Promise<User> {
    return this.service.findOne(req.user.userId);
  }
}
