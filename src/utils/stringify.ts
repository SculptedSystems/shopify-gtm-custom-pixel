export function stringifyObject(obj: object): string {
  return JSON.stringify(obj, null, 2);
}
