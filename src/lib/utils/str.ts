export function isFunction(functionToCheck: unknown): boolean {
  return (functionToCheck &&
    {}.toString.call(functionToCheck) === "[object Function]") as boolean;
}

/**
 * Converts a string to slug
 *
 * @param {string} text
 * @return {string}
 */
export function slugify(text?: string): string | undefined {
  if (!text) {
    return undefined;
  }

  text = text.replace(/^\s+|\s+$/g, "");
  text = text.toLowerCase();

  const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaaaeeeeiiiioooouuuunc------";

  for (let i = 0, l = from.length; i < l; i++) {
    text = text.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  return text
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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
