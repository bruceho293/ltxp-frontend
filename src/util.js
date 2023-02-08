import { FILTER_NOT_ACTIVE } from './constants/global'

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
    searches.splice(idx, 1)
    if (searches.length > 0)
      localStorage.setItem('searches', JSON.stringify(searches))
    else localStorage.removeItem('searches')
  }
}

export function GetSearchResultsFromStorage() {
  let searches = localStorage.getItem('searches')
  if (searches == null) return null

  return JSON.parse(searches)
}

export function UpdateFilterOptionFromStorage(label, value) {
  if (value === FILTER_NOT_ACTIVE) localStorage.removeItem(label)
  else localStorage.setItem(label, value)
}

export function GetFilterOptionFromStorage(label) {
  return localStorage.getItem(label)
}

export const sortHelper = (arr, filterSettings) => {
  return arr.sort(function(a, b) {
    for (let i = 0; i < filterSettings.length; i++) {
      const sign = filterSettings[i].isAsc ? 1 : -1
      const field = filterSettings[i].field
      if (a[field] > b[field]) return sign
      if (a[field] < b[field]) return -1 * sign
    }
    return 0
  })
}
