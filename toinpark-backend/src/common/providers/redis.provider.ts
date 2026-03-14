import Redis from "ioredis";
import { Provider, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

const logger = new Logger('RedisProvider');

export const RedisProvider: Provider = {
  provide: "REDIS_CLIENT",
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const isProduction = configService.get<string>('NODE_ENV') === 'production';
    const host = configService.get<string>("REDIS_HOST") || 'localhost';
    const port = configService.get<number>("REDIS_PORT") ?? 6379;
    const password = configService.get<string>("REDIS_PASS");
    const db = configService.get<number>("REDIS_DB") ?? 0;
    
    logger.log(`🔗 Connecting to Redis at ${host}:${port} (DB: ${db})`);

    const redis = new Redis({
      host,
      port,
      password,
      db,
      family: 4,
      tls: undefined, // DO NOT use TLS
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      connectTimeout: 30000,
      commandTimeout: 30000,
      lazyConnect: false,
      retryStrategy: (times: number) => Math.min(times * 50, 2000),
      connectionName: 'nestjs-app',
    })

    // Add event listeners after creating the instance
    redis.on('error', (error) => {
      logger.error('❌ Redis connection error:', error.message);
    });

    redis.on('connect', () => {
      logger.log('✅ Redis connected successfully');
    });

    redis.on('ready', () => {
      logger.log('🚀 Redis ready for commands');
    });

    return redis;
  },
};