export function CreateRegexFromString(string) {
  const temp = string.trim().toLowerCase()
  let words = temp.split(' ')
  words = words.map(word => '(' + word + ')')
  return '.*' + words.join('.*') + '.*'
}

export function AddSearchResultsFromStorage(searchTerm) {
  let searches = GetSearchResultsFromStorage()
  if (searches == null) searches = []

  // Add the new searchTerm
  if (searches.includes(searchTerm)) return
  searches = searches.concat(searchTerm)

  // Save the new searches into Storage
  localStorage.setItem('searches', JSON.stringify(searches))
}

export function RemoveSearchResultsFromStorage(searchTerm) {
  let searches = GetSearchResultsFromStorage()
  if (searches == null) return

  // Remove the new searchTerm
  let idx = searches.indexOf(searchTerm)
  if (idx >= 0) {
    searches = searches.splice(idx, 1)
    localStorage.setItem('searches', JSON.stringify(searches))
  }
}

export function GetSearchResultsFromStorage() {
  let searches = localStorage.getItem('searches')
  if (searches == null) return null

  return JSON.parse(searches)
}
