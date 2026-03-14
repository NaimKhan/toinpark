import { Injectable, Inject, Logger, ServiceUnavailableException } from "@nestjs/common";
import Redis from "ioredis";
import { otpObjectDto } from "../auth/dto/auth.dto";

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private isConnected = false;

  constructor(@Inject("REDIS_CLIENT") private readonly redis: Redis) {
    this.setupConnectionHandlers();
  }

  /**
   * Setup Redis connection event handlers
   */
  private setupConnectionHandlers(): void {
    this.redis.on('connect', () => {
      this.isConnected = true;
      this.logger.log('Redis connected successfully');
    });

    this.redis.on('ready', () => {
      this.isConnected = true;
      this.logger.log('Redis is ready');
    });

    this.redis.on('error', (error) => {
      this.isConnected = false;
      this.logger.error('Redis connection error:', error);
    });

    this.redis.on('close', () => {
      this.isConnected = false;
      this.logger.warn('Redis connection closed');
    });

    this.redis.on('reconnecting', () => {
      this.logger.log('Redis reconnecting...');
    });

    this.redis.on('end', () => {
      this.isConnected = false;
      this.logger.warn('Redis connection ended');
    });
  }

  /**
   * Check if Redis is available
   */
  private async ensureConnection(): Promise<void> {
    try {
      await this.redis.ping();
      this.isConnected = true;
    } catch (error) {
      this.isConnected = false;
      this.logger.error('Redis is unavailable:', error);
      throw new ServiceUnavailableException(
        'Redis service is currently unavailable. Please try again later.'
      );
    }
  }

  /**
   * Get Redis connection status
   */
  async isRedisAvailable(): Promise<boolean> {
    try {
      await this.redis.ping();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Set a value in Redis (supports TTL in seconds)
   */
  async set(
    key: string,
    value: string | object,
    ttlSeconds?: number,
  ): Promise<void> {
    await this.ensureConnection();

    try {
      const storeValue =
        typeof value === "object" ? JSON.stringify(value) : value;

      if (ttlSeconds) {
        await this.redis.set(key, storeValue, "EX", ttlSeconds);
        this.logger.debug(`Set key '${key}' with TTL ${ttlSeconds}s`);
      } else {
        await this.redis.set(key, storeValue);
        this.logger.debug(`Set key '${key}' without TTL`);
      }
    } catch (error) {
      this.logger.error(`Error setting key '${key}':`, error);
      throw new ServiceUnavailableException(
        `Failed to set Redis key '${key}'`
      );
    }
  }

  /**
   * Get a value from Redis (auto-parses JSON if possible)
   */
  async get<T = string>(key: string): Promise<T | null> {
    await this.ensureConnection();

    try {
      const data = await this.redis.get(key);
      if (!data) return null;

      try {
        return JSON.parse(data) as T;
      } catch {
        return data as unknown as T;
      }
    } catch (error) {
      this.logger.error(`Error getting key '${key}':`, error);
      throw new ServiceUnavailableException(
        `Failed to get Redis key '${key}'`
      );
    }
  }

  /**
   * Delete a key
   */
  async del(key: string): Promise<void> {
    await this.ensureConnection();

    try {
      await this.redis.del(key);
      this.logger.debug(`Deleted key '${key}'`);
    } catch (error) {
      this.logger.error(`Error deleting key '${key}':`, error);
      throw new ServiceUnavailableException(
        `Failed to delete Redis key '${key}'`
      );
    }
  }

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    await this.ensureConnection();

    try {
      const exists = await this.redis.exists(key);
      return exists === 1;
    } catch (error) {
      this.logger.error(`Error checking existence of key '${key}':`, error);
      throw new ServiceUnavailableException(
        `Failed to check Redis key existence '${key}'`
      );
    }
  }

  /**
   * Manually set expiration (in seconds)
   */
  async expire(key: string, ttlSeconds: number): Promise<void> {
    await this.ensureConnection();

    try {
      await this.redis.expire(key, ttlSeconds);
      this.logger.debug(`Updated TTL for '${key}' to ${ttlSeconds}s`);
    } catch (error) {
      this.logger.error(`Error setting expiration for key '${key}':`, error);
      throw new ServiceUnavailableException(
        `Failed to set expiration for Redis key '${key}'`
      );
    }
  }

  /**
   * Clear all keys (Use carefully!)
   */
  async flushAll(): Promise<void> {
    await this.ensureConnection();

    try {
      await this.redis.flushall();
      this.logger.warn("Redis FLUSHALL executed!");
    } catch (error) {
      this.logger.error('Error flushing Redis:', error);
      throw new ServiceUnavailableException('Failed to flush Redis');
    }
  }

  /**
   * Push a value to a list (e.g., OTP history)
   */
  async pushToList(
    key: string,
    value: string | object,
    maxItems = 50,
  ): Promise<void> {
    await this.ensureConnection();

    try {
      const serialized =
        typeof value === "object" ? JSON.stringify(value) : value;
      await this.redis.lpush(key, serialized);
      await this.redis.ltrim(key, 0, maxItems - 1);
    } catch (error) {
      this.logger.error(`Error pushing to list '${key}':`, error);
      throw new ServiceUnavailableException(
        `Failed to push to Redis list '${key}'`
      );
    }
  }

  /**
   * Get full list of values (e.g., OTP history)
   */
  async getList<T = string>(key: string): Promise<T[]> {
    await this.ensureConnection();

    try {
      const list = await this.redis.lrange(key, 0, -1);

      return list.map((item) => {
        try {
          return JSON.parse(item) as T;
        } catch {
          return item as unknown as T;
        }
      });
    } catch (error) {
      this.logger.error(`Error getting list '${key}':`, error);
      throw new ServiceUnavailableException(
        `Failed to get Redis list '${key}'`
      );
    }
  }

  /**
   * Set promoter link helper
   */
  async setPromoterLink(
    phoneOrUserId: string,
    link: string,
    ttlSeconds = 86400, // 1 day default
  ): Promise<void> {
    await this.set(`promoterLink:${phoneOrUserId}`, link, ttlSeconds);
  }

  /**
   * Get promoter link helper
   */
  async getPromoterLink(phoneOrUserId: string): Promise<string | null> {
    return await this.get<string>(`promoterLink:${phoneOrUserId}`);
  }

  /**
   * Health check for Redis
   */
  async healthCheck(): Promise<{
    status: string;
    message: string;
    timestamp: string;
  }> {
    try {
      await this.redis.ping();
      return {
        status: 'healthy',
        message: 'Redis is available',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        message: `Redis is unavailable: ${error.message}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Graceful shutdown
   */
  async onModuleDestroy(): Promise<void> {
    this.logger.log('Closing Redis connection...');
    await this.redis.quit();
  }

  async getAllKeysWithValues(): Promise<otpObjectDto[]> {

    const keys = await this.redis.keys('*');
    this.logger.log("redis service 293 keys", keys)

    const result: otpObjectDto[] = [];

    for (const key of keys) {
      const value = await this.redis.get(key);
      result.push(JSON.parse(value));
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

}