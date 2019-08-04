import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { getAction } from '@nestjsx/crud';
import { JWTPayload } from '@/modules/auth/models/jwt-payload';

@Injectable()
export class ACLGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const handler = ctx.getHandler();
    const controller = ctx.getClass();
    const namespace = Reflect.getMetadata('namespace', controller)
    const feature = Reflect.getMetadata('path', controller)
    const action = getAction(handler);

    const user = ctx.switchToHttp().getRequest().user as JWTPayload;
    const permission = `${namespace}.${feature}.${action}`.toLowerCase();
    const isAuthorized = user.permissions.includes(permission);
    if (!isAuthorized) {
      throw new UnauthorizedException('You don\'t have the right permissions.')
    }
    return isAuthorized;
  }
}
