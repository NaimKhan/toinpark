import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

export function softDeleteMiddleware() {
  return async (params: any, next: any) => {
    const modelsWithSoftDelete = ['Country', 'State',  'User', 'UserWallet', 'UserProfile', 'Roles', 'MenuAndPermissionSetups', 'RoleWiseMenuAndPermission', 'RequestResponsesLog', 'SuccessOrErrorOrSmsOrEmailText', 'Transaction', 'Package', 'Category'];

    if (modelsWithSoftDelete.includes(params.model!)) {
      // Automatically add condition to find queries
      if (params.action === 'findUnique' || params.action === 'findFirst') {
        params.action = 'findFirst';
        params.args.where = {
          ...params.args.where,
          isDeleted: false,
        };
      }

      if (params.action === 'findMany') {
        params.args.where = {
          ...params.args.where,
          isDeleted: false,
        };
      }

      // Override delete action → convert to update
      if (params.action === 'delete') {
        params.action = 'update';
        params.args.data = { isDeleted: true, deletedAt: new Date() };
      }

      // Override deleteMany → updateMany
      if (params.action === 'deleteMany') {
        params.action = 'updateMany';
        params.args.data = { isDeleted: true, deletedAt: new Date() };
      }
    }

    return next(params);
  };
}
