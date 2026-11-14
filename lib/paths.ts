const BASE_PATH = "/Schokk-Industry";

export function publicAsset(path?: string) {
  if (!path) return `${BASE_PATH}/images/placeholder.svg`;
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
