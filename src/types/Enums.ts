export enum ProjectPages {
  Home = '',
  Login = 'login',
  Registration = 'registration',
  Catalog = 'catalog',
  MyProfile = 'my-profile',
  Cart = 'cart',
  AboutUs = 'about-us',
  NotFound = 'not-found',
}

export enum PasswordHints {
  LengthHint = 'Password must be at least 8 characters long',
  UpperLettersHint = 'Password must contain at least one uppercase letter (A-Z).',
  LowerLettersHint = 'Password must contain at least one lowercase letter (a-z)',
  DigitsHint = 'Password must contain at least one digit (0-9)',
  SpecialCharsHint = 'Password must contain at least one one of: !@#$%^&*',
  SpacesHint = 'Password must not contain spaces',
}

export enum EmailHints {
  EmailFormatHint = 'Incorrect email format',
}
