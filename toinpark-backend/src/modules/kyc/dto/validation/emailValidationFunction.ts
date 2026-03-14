import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { z } from 'zod';

@ValidatorConstraint({ async: false })
export class IsValidGmail implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    if (typeof value !== 'string') return false;

    const identifier = value.trim();
    if (!identifier) return false;

    // Only validate if it's an email. Otherwise skip (return true).
    if (!identifier.includes('@')) return true;

    // Same as RegisterRequestSchema (email validation)
    const emailResult = z.string().email().safeParse(identifier);
    if (!emailResult.success) return false;

    if (identifier.length < 5) return false;
    if (identifier.length > 64) return false;

    // Gmail must end with .com -> block gmail.co (same as register)
    const domain = identifier.split('@')[1]?.toLowerCase();
    if (domain === 'gmail.co') return false;

    // Prevent continuous repeated characters (4 or more)
    if (/(.)\1{3,}/.test(identifier)) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const value = typeof args.value === 'string' ? args.value.trim() : '';

    if (!value) return 'Identifier is required';
    if (!value.includes('@')) return 'Invalid email format';

    return 'Invalid email format';
  }
}
