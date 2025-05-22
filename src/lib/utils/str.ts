export function isFunction(functionToCheck: unknown): boolean {
  return (functionToCheck &&
    {}.toString.call(functionToCheck) === "[object Function]") as boolean;
}
