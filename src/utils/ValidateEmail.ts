import { EmailHints } from '../types/Enums';

class EmailValidator {
  static validate(email: string): string | boolean {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return EmailHints.EmailFormatHint;
    }

    return true;
  }
}

export default EmailValidator;
