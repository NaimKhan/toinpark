import { SetMetadata } from '@nestjs/common';

export const SKIP_THROTTLE_KEY = 'skipThrottle';

/**
 * Skip rate limiting for specific endpoint
 * Usage: @SkipThrottle()
 */
export const SkipThrottle = () => SetMetadata(SKIP_THROTTLE_KEY, true);