import { Module } from '@nestjs/common';
import { UserWalletAddressService } from './user-wallet-address.service';
import { UserWalletAddressController } from './user-wallet-address.controller';

@Module({
  controllers: [UserWalletAddressController],
  providers: [UserWalletAddressService],
})
export class UserWalletAddressModule {}
