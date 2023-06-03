import {
    CanActivate,
    ExecutionContext,
    Injectable
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
  
  @Injectable()
  export class RoleSocketGuard implements CanActivate {
    constructor(private reflector: Reflector,
      private jwtService: JwtService
    ) { }
  
   async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        console.log('testauth')
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const clientSocket = context.switchToWs().getClient<Socket>()
       
        
        const authorization = clientSocket.handshake.query.token as string
       
        const authToken = this.jwtService.verify(authorization.replace("Bearer ", ""));
        let count = 0
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
  