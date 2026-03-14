import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import { ConfigModule } from "@nestjs/config";
import { RedisProvider } from "src/common/providers/redis.provider";
// import { OtpTestController } from "./otp-test.controller";

@Module({
  imports: [ConfigModule],
  providers: [RedisProvider, RedisService],
  exports: [RedisService, RedisProvider], // ← Make sure RedisProvider is exported
  // controllers: [OtpTestController],
})
export class RedisModule {}