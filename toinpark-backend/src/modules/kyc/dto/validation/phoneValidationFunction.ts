import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

@ValidatorConstraint({ async: false })
export class IsValidPhoneNumber implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments) {
    if (typeof value !== 'string') return false;

    const identifier = value.trim();
    if (!identifier) return false;

    // Only validate phone if it's NOT an email. If it's email, skip.
    if (identifier.includes('@')) return true;

    // Same as RegisterRequestSchema (phone validation)
    const phoneForValidation = identifier.startsWith('+') ? identifier : `+${identifier}`;
    const phoneNumber = parsePhoneNumberFromString(phoneForValidation);

    if (!phoneNumber || !phoneNumber.isValid()) return false;

    return true;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Invalid phone number format';
  }
}
