import {
    applyDecorators,
    SetMetadata,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from './role.guard';


export function Auth(...roles: string[]) {
    if (Array.isArray(roles) && roles.length > 0) {
        return applyDecorators(SetMetadata('roles', roles), UseGuards(RoleGuard), ApiBearerAuth());
    }
}
