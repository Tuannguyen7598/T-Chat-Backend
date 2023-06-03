import {
    applyDecorators,
    SetMetadata,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from './role.guard';
import { RoleSocketGuard } from './role-socket.guard';


export function AuthSocket(...roles: string[]) {
    if (Array.isArray(roles) && roles.length > 0) {
        return applyDecorators(SetMetadata('roles', roles), UseGuards(RoleSocketGuard));
    }
}
