const ONE_DAY = 24 * 60 * 60 * 1000;
const BASE_UNITS: Record<string, number> = { d: 1, w: 7, m: 30, y: 365 };

export function generateExpTime(unit: string | number) {
  if (typeof unit === "string") {
    const match = unit.match(/^(\d+)([dwmy])$/);

    if (!match) return ONE_DAY;

    const [_, amount, timeUnit] = match;

    if (BASE_UNITS[timeUnit]) {
      return parseInt(amount) * BASE_UNITS[timeUnit] * ONE_DAY;
    }

    return ONE_DAY;
  }

  if (typeof unit === "number") {
    return ONE_DAY * unit;
  }

  return ONE_DAY;
}
