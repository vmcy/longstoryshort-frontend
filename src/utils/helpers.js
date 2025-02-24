export function isValidURL(url) {
  const pattern = new RegExp(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[^\s]*)?(\?.*)?(#.*)?$/i)
  return pattern.test(url)
}
