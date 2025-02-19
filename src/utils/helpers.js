export function isValidURL(url) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z0-9-]+)\\.)+[a-zA-Z]{2,})' + // domain name
      '(\\/[a-zA-Z0-9@:%._\\+~#?&//=]*)?$', // path
    'i',
  )
  return pattern.test(url)
}
