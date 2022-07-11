// Return Unix UTC+0 timestamp in seconds from date object
export function getUtcSeconds(date: Date) {
  return Math.floor(
    date.getTime() /
      // + date.getTimezoneOffset() * 60_000
      1000,
  );
}

// Return date object from Unix UTC+0 timestamp in seconds
export function getLocalDate(seconds: number) {
  return new Date(
    seconds * 1000,
    // - new Date().getTimezoneOffset() * 60_000
  );
}

export const DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

export function getDaysLeft(date: Date) {
  return Math.ceil((date.getTime() - new Date().getTime()) / DAY_MILLISECONDS);
}
