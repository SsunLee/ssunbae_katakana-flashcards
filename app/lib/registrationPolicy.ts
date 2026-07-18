export const MIN_ACCOUNT_AGE = 14;
export const TERMS_VERSION = "2026-07-18";
export const PRIVACY_VERSION = "2026-07-18";

export function isAtLeastAge(
  birthDate: string,
  minimumAge = MIN_ACCOUNT_AGE,
  today = new Date(),
): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const parsed = new Date(year, month - 1, day);

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day ||
    parsed > today
  ) {
    return false;
  }

  let age = today.getFullYear() - year;
  const birthdayHasPassed =
    today.getMonth() > month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() >= day);
  if (!birthdayHasPassed) age -= 1;

  return age >= minimumAge;
}
