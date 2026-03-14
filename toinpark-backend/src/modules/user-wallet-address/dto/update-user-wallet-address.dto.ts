import { PartialType } from '@nestjs/swagger';
import { CreateUserWalletAddressDto } from './create-user-wallet-address.dto';

export class UpdateUserWalletAddressDto extends PartialType(
  CreateUserWalletAddressDto,
) {}
