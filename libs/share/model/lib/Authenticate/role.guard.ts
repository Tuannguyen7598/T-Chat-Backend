import {
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private jwtService: JwtService
  ) { }

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      const request = context.switchToHttp().getRequest();
      
      const authorization = request.headers?.authorization?.toString() ?? (request.query.token as string) ?? "";
      const authToken = this.jwtService.verify(authorization.replace("Bearer ", ""));
      let count = 0
      request.userInfor = authToken
      roles.forEach(x => {
        if (x === authToken.role) {
          count++
        }
      })
      if (count > 0) {
        return true
      } else { false }
      
    } catch (error) {
      console.error(error)
    }
  }
}
