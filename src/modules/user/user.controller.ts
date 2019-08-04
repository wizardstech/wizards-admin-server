import { Controller, Get, HttpStatus, Req, HttpException, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';

import { User } from './models';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
    exclude: ['password']
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
  async find(@Req() req): Promise<User> {
    return this.service.findOne(req.user.userId);
  }
}
