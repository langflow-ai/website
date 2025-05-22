/**
 * Check if a script by url is loaded
 * @param {string} url
 * @returns
 */
export const isScriptLoaded = (url: string): boolean => {
  const scripts = document.getElementsByTagName("script");
  for (let i = scripts.length; i--; ) {
    if (scripts[i].src == url) return true;
  }
  return false;
};

/**
 * loadScript
 * Load script to the head element in the document
 *
 * @param {string} url
 * @param {Function} onLoad
 * @param {Function} onError
 */
export const loadScript = (
  url: string,
  onLoad?: () => void,
  onError?: () => void,
  loadToBody?: boolean,
): void => {
  const script: HTMLScriptElement = document.createElement("script");
  script.onload = onLoad ? onLoad : () => null;
  script.onerror = onError ? onError : () => null;
  script.src = url;

  if (loadToBody) {
    document.body.appendChild(script);
    return;
  }

  document.head.appendChild(script);
};
