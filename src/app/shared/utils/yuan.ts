/**
 * convert to RMB format
 *
 * @param digits when the value is a number, you can specify the number of decimal places, default is 2
 */
export function yuan(value: number | string, digits = 2): string {
  if (typeof value === 'number') {
    value = value.toFixed(digits);
  }
  return `&yen ${value}`;
}
