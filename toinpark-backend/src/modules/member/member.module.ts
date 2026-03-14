import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { UserTransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [PrismaModule, UserTransactionModule],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}