import { applyDecorators, SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/user-role.enum';
import { ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger/dist/decorators';

export const ROLES_KEY = 'roles';

/**
 * Require specific roles for endpoint access
 * Usage: @Roles(UserRole.ADMIN, UserRole.MEMBER)
 */
export const Roles = (...roles: UserRole[]) => {
    const rolesString = roles.join(', ');
  
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        ApiForbiddenResponse({ 
        description: `Forbidden - Requires one of the following roles: ${rolesString}`,
        schema: {
            example: {
                success: false,
                statusCode: 403,
                message: `Access denied.`,
                timestamp: new Date().toISOString()
            }
        }
        }),
    );
}
