export function isValidURL(url) {
  const pattern = new RegExp(/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/[\w.-]*)*(\?.*)?(#.*)?$/i)
  return pattern.test(url)
}
