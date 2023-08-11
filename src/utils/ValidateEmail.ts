import { EmailHints } from '../types/Enums';

function validateEmail(email: string): string | boolean {
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    return EmailHints.EmailFormatHint;
  }

  return true;
}

export default validateEmail;
