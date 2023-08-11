/* eslint-disable no-nested-ternary */
import { PasswordHints } from '../types/Enums';

class PasswordValidator {
  static validate(password: string): string | boolean {
    if (password.length < 8) {
      return PasswordHints.LengthHint;
    }

    if (!/[A-Z]/.test(password)) {
      return PasswordHints.UpperLettersHint;
    }

    if (!/[a-z]/.test(password)) {
      return PasswordHints.LowerLettersHint;
    }

    if (!/[0-9]/.test(password)) {
      return PasswordHints.DigitsHint;
    }

    if (/\s/.test(password)) {
      return PasswordHints.SpacesHint;
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return PasswordHints.SpecialCharsHint;
    }
    return true;
  }
}

export default PasswordValidator;
