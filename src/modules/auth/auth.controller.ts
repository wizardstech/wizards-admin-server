import { Controller, Post, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiImplicitBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthDto, CredentialsDto } from './models';
import { Namespace, NamespaceList } from '@/decorators/namespace.decorator';

@Namespace(NamespaceList.IAM)
@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ title: 'Get token via credentials' })
  @ApiImplicitBody({ name: 'Credentials', type: CredentialsDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Jwt token with expiry', type: AuthDto })
  public async login(@Request() req): Promise<any> {
    return await this.service.login(req.user);
  }
}
