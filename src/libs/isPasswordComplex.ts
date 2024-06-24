import { UPPERCASE_REGEX, LOWER_REGEX, SPECIAL_CHAR_REGEX } from "./regex";

export default function isPasswordComplex(password: string): boolean {
  const containsUppercase = (ch: string) => UPPERCASE_REGEX.test(ch);
  const containsLowercase = (ch: string) => LOWER_REGEX.test(ch);
  const containsSpecialChar = (ch: string) => SPECIAL_CHAR_REGEX.test(ch);

  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0,
    countOfSpecialChar = 0;

  for (let i = 0; i < password.length; i++) {
    let ch = password.charAt(i);
    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }

  if (
    countOfLowerCase < 1 ||
    countOfUpperCase < 1 ||
    countOfSpecialChar < 1 ||
    countOfNumbers < 1
  )
    return false;

  return true;
}
