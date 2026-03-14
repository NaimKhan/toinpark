import { z } from "zod";
import { HttpStatus } from "@nestjs/common";

// --------------------
// Pagination Type
// --------------------

type TPagination = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
};

// --------------------
// Laravel-Inspired Response Types
// --------------------

/**
 * Standard API Response Format (Laravel-inspired)
 * 
 * Used for all successful API responses
 * {
 *   "success": true,
 *   "statusCode": 200,
 *   "message": "Operation successful",
 *   "data": {...},
 *   "pagination": {...} // Optional for paginated responses
 * }
 */
type TCreateResponseReturnTypes<
  T extends Record<string, any> | Array<any> | null | undefined = null
> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | any;
  pagination?: TPagination;
};

type TCreateResponse = <
  T extends Record<string, any> | Array<any> | null | undefined = null
>(
  props: Omit<TCreateResponseReturnTypes<T>, "pagination"> &
    Partial<Pick<TCreateResponseReturnTypes<T>, "pagination">>
) => TCreateResponseReturnTypes<T>;

/**
 * Create a successful API response
 * 
 * @param success - Boolean indicating success
 * @param statusCode - HTTP status code (default: 200)
 * @param message - Response message
 * @param data - Response data (can be null)
 * @param pagination - Optional pagination info
 * @returns Standardized response object
 * 
 * @example
 * createResponse({
 *   success: true,
 *   statusCode: 200,
 *   message: 'User created successfully',
 *   data: { id: 1, name: 'John' }
 * })
 */
export const createResponse: TCreateResponse = ({
  success,
  statusCode = 200,
  message = "Request successful",
  data = null,
  pagination,
}) => ({
  success,
  statusCode,
  message,
  data: data,
  pagination,
});


// --------------------
// Validation Error Response Types
// --------------------

export type ValidationErrorResponse = {
  success: false;
  statusCode: number;
  message: string;
  errors: Record<string, string[]>;
};

// --------------------
// Success Response Types
// --------------------

export type SuccessResponse<T = any> = {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  pagination?: TPagination;
};

// --------------------
// Error Response Types
// --------------------

export type ErrorResponse = {
  success: false;
  statusCode: number;
  message: string;
  errors: Record<string, string[]> | null;
};

// --------------------
// API Response Union Type
// --------------------

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse | ValidationErrorResponse;
