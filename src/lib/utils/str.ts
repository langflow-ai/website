export function isFunction(functionToCheck: unknown): boolean {
  return (functionToCheck &&
    {}.toString.call(functionToCheck) === "[object Function]") as boolean;
}

export const parseSlugToString = (param?: string | string[]): string => {
  if (!param) {
    return "";
  }

  if (Array.isArray(param)) {
    return param.join("/");
  }

  return param;
};
