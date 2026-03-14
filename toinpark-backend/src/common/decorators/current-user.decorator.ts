import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extract current user from request
 * Usage: @CurrentUser() user: User
 * Usage: @CurrentUser('id') userId: string
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);