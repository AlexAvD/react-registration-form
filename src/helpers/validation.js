const SPECIAL_CHARACTERS = "!@#$%^&_";

const hasUppercase = (str) => /[A-Z]/.test(str);
const hasLowercase = (str) => /[a-z]/.test(str);
const hasDigit = (str) => /\d/.test(str);
const hasSpecial = (str) => new RegExp(`[${SPECIAL_CHARACTERS}]`).test(str);
const hasOnlyAllowed = (chars, str) => new RegExp(`^[${chars}]*$`).test(str);
const isPhone = (str) => /^(\+7|8)\s*\d{3}\s*\d{3}\s*\d{2}\s*\d{2}$/.test(str);
// eslint-disable-next-line
const isEmail = (str) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(str);
const min = (num) => (value) => {
  return value.length < num && `Минимальный размер ${num}`;
};

const max = (num) => (value) => {
  return value.length > num && `Максимальный размер ${num}`;
};

const minMax = (minChars, maxChars) => (value) => {
  return min(minChars)(value) || max(maxChars)(value);
};

const onlyAllowed = (chars) => (value) => {
  return (
    !hasOnlyAllowed(chars, value) && `Допустимы только след. символы: ${chars}`
  );
};

const req = (value) => !value.length && "Обязательное поле";
const email = (value) => !isEmail(value) && "Некорректный Email";
const phone = (value) => !isPhone(value) && "Некорректный номер телефона";

const emailOrPhone = (value) =>
  !isEmail(value) && !isPhone(value) && "Некорректный номер телефона или Email";

const password = (value) => {
  if (!hasUppercase(value)) {
    return `Должна быть хотя бы 1 большая буква латинсокго алфавита`;
  }

  if (!hasLowercase(value)) {
    return `Должна быть хотя бы 1 маленькая буква латинсокго алфавита`;
  }

  if (!hasDigit(value)) {
    return `Должна быть хотя бы 1 быть цифра`;
  }

  if (!hasSpecial(value)) {
    return `Должн быть хотя бы 1 спец. символ (${SPECIAL_CHARACTERS})`;
  }
};

const validate = (value, checks) => {
  for (const check of checks) {
    const error = check(value);

    if (error) return error;
  }
};

const validateName = (value) => {
  return validate(value, [req, minMax(3, 30), onlyAllowed("a-zA-Z0-9")]);
};

const validateNickname = validateName;

const validateEmail = (value) => {
  return validate(value, [req, email]);
};

const validatePhone = (value) => {
  return validate(value, [req, phone]);
};

const validateEmailOrPhone = (value) => {
  return validate(value, [req, emailOrPhone]);
};

const validatePassword = (value) => {
  return validate(value, [
    req,
    onlyAllowed(`a-zA-Z0-9${SPECIAL_CHARACTERS}`),
    minMax(8, 30),
    password,
  ]);
};

const validateConsent = (value) => {
  return !value && "Необходимо согласиться с условиями";
};

export const validateSignupForm = ({
  name,
  nickname,
  email,
  phone,
  password,
  consent,
}) => {
  const errors = {};
  const errorName = validateName(name);
  const errorNickname = validateNickname(nickname);
  const errorEmail = validateEmail(email);
  const errorPhone = validatePhone(phone);
  const errorPassword = validatePassword(password);
  const errorConsent = validateConsent(consent);

  if (errorName) {
    errors.name = errorName;
  }

  if (errorNickname) {
    errors.nickname = errorNickname;
  }

  if (errorEmail) {
    errors.email = errorEmail;
  }

  if (errorPhone) {
    errors.phone = errorPhone;
  }

  if (errorPassword) {
    errors.password = errorPassword;
  }

  if (errorConsent) {
    errors.consent = consent;
  }

  return errors;
};

export const validateLoginForm = ({ emailOrPhone, password }) => {
  const errors = {};
  const errorEmailOrPhone = validateEmailOrPhone(emailOrPhone);
  const errorPassword = validatePassword(password);

  if (errorEmailOrPhone) {
    errors.emailOrPhone = errorEmailOrPhone;
  }

  if (errorPassword) {
    errors.password = errorPassword;
  }

  return errors;
};
