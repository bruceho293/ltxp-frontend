export function CreateRegexFromString(string) {
  const temp = string.trim().toLowerCase()
  let words = temp.split(' ')
  words = words.map(word => '(' + word + ')')
  return '.*' + words.join('.*') + '.*'
}
