export type TErrorResponse = {
  data?: {
    message?: string;
    errors?: Record<string, string | string[]>;
    statusCode?: number;
    data?: {
      isVerified?: boolean;
      otpUniqueKey?: string;
    };
  };
};
