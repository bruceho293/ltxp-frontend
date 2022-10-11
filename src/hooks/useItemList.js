import { useEffect, useState, useMemo } from 'react'
import { CreateRegexFromString } from '../util'
import { LIKE, DISLIKE, NEUTRAL } from '../components/LikeDislikeButton.js'
import { PAGE_SIZE } from '../components/Pagination'

const ASC_VALUE = 'asc'
const DESC_VALUE = 'desc'

const filterJson = (fid, title, label, field) => {
  return {
    fid: fid,
    title: title,
    label: label,
    field: field,
    active: false,
    isAsc: true,
    ascLabel: 'Lo > Hi',
    descLabel: 'Hi > Lo',
  }
}

const filtersTemplate = [
  filterJson(1, 'Price', 'price', 'cost'),
  filterJson(2, 'Ext Comparison Price', 'extComparePrice', 'costDiff'),
  filterJson(3, 'Last Update Day', 'LUD', 'update'),
]

const sortAsc = (arr, field) => {
  return arr.sort((a, b) => {
    if (arr[a] > arr[b]) return 1
    if (arr[a] < arr[b]) return -1
    return 0
  })
}

const sortDesc = (arr, field) => {
  return arr.sort((a, b) => {
    if (arr[a] > arr[b]) return -1
    if (arr[a] < arr[b]) return 1
    return 0
  })
}

export const useItemList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [laptops, setLaptops] = useState([])

  // Search and Fitler Terms
  const [searches, setSearches] = useState([])
  const [filters, setFilters] = useState(filtersTemplate)

  // Filter display
  const [filterShown, setFilterShown] = useState(false)

  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE
    const lastPageIndex = firstPageIndex + PAGE_SIZE
    return laptops.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, laptops])

  useEffect(() => {
    const searchRegexes = searches.map(
      result => new RegExp(CreateRegexFromString(result))
    )

    const filteredData = data.filter(laptop =>
      searchRegexes.some(regex => regex.test(laptop.name.trim().toLowerCase()))
    )

    filters.forEach(filter => {
      if (filter.active) {
      }
    })

    setLaptops(filteredData)
  }, [searches, filters])

  const updateLaptopImp = (laptopId, buttonPressed) => {
    setLaptops(() => {
      const laptop = laptops.find(laptop => laptop.id === laptopId)
      const index = laptops.indexOf(laptop)
      const currentImp = laptop.imp
      const targetImp = buttonPressed
      const oppositeImp = targetImp === LIKE ? DISLIKE : LIKE

      const val = targetImp === LIKE ? 'likes' : 'dislikes'
      const otherVal = targetImp === LIKE ? 'dislikes' : 'likes'

      const currentVal = laptop[val]
      const newOtherVal =
        currentImp === oppositeImp ? laptop[otherVal] - 1 : laptop[otherVal]

      if (currentImp === targetImp) {
        return Object.assign([...laptops], {
          [index]: {
            ...laptops[index],
            imp: NEUTRAL,
            [val]: currentVal - 1,
          },
        })
      } else {
        return Object.assign([...laptops], {
          [index]: {
            ...laptops[index],
            imp: targetImp,
            [val]: currentVal + 1,
            [otherVal]: newOtherVal,
          },
        })
      }
    })
  }

  const addSearchResult = result => {
    if (!searches.includes(result)) setSearches(searches.concat(result))
  }

  const deleteSearchResult = result => {
    const temps = [...searches]
    const index = temps.indexOf(result)
    if (index > -1) {
      temps.splice(index, 1)
      setSearches(temps)
    }
  }

  const addFilter = event => {
    const { value, fid } = event.target.dataset

    const index = filters.findIndex(filter => filter.fid === Number(fid))
    const newFilters = [...filters]
    if (index > -1) {
      newFilters[index] = {
        ...newFilters[index],
        active: true,
        isAsc: value === ASC_VALUE,
      }
    }
    setFilters(newFilters)
  }

  const deleteFilter = fid => {
    const index = filters.findIndex(filter => filter.fid === Number(fid))
    const newFilters = [...filters]
    if (index > -1) {
      newFilters[index] = {
        ...newFilters[index],
        active: false,
      }
    }
    setFilters(newFilters)
  }

  return {
    currentPage,
    currentData,
    laptops,
    filters,
    searches,
    filterShown,
    updateLaptopImp,
    setFilterShown,
    setCurrentPage,
    addSearchResult,
    deleteSearchResult,
    addFilter,
    deleteFilter,
  }
}
