import { useEffect, useState, useMemo } from 'react'
import {
  CreateRegexFromString,
  AddSearchResultsFromStorage,
  RemoveSearchResultsFromStorage,
} from '../util'
import { LIKE, DISLIKE, NEUTRAL } from '../components/LikeDislikeButton.js'
import { PAGE_SIZE } from '../components/Pagination'
import axios from 'axios'
import { ASC_VALUE } from '../constants/global'

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
  filterJson(3, 'Last Update Day', 'LUD', 'updated'),
]

const sortHelper = (arr, filterSettings) => {
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

export const useItemList = ({ isProfile }) => {
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

  // Get the saved search terms and fitlter options when component mounted
  useEffect(() => {
    const searchesString = localStorage.getItem('searches')
    if (searchesString != null) setSearches(JSON.parse(searchesString))
  }, [])

  // Update the data based on search terms and filter options
  useEffect(() => {
    const searchRegexes = searches.map(
      result => new RegExp(CreateRegexFromString(result))
    )

    let data = null
    const host = process.env.REACT_APP_HOST
    axios
      .get(host + 'api/laptops/')
      .then(response => {
        data = response.data
      })
      .then(() => {
        const searchData = data.filter(laptop =>
          searchRegexes.some(regex =>
            regex.test(laptop.name.trim().toLowerCase())
          )
        )

        const interestData = data.filter(laptop => laptop.imp !== 0)

        let finalData = isProfile ? interestData : searchData

        let activeFilters = []
        filters.forEach(filter => {
          if (filter.active) activeFilters.push(filter)
        })

        if (activeFilters.length > 0)
          finalData = sortHelper(finalData, activeFilters)
        setLaptops(finalData)
      })
      .catch(function(error) {
        console.log(error)
      })
  }, [searches, filters])

  const updateLaptopImp = (laptopSlug, buttonPressed) => {
    setLaptops(() => {
      const laptop = laptops.find(laptop => laptop.slug === laptopSlug)
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
    const resultLower = result.toLowerCase()
    if (!searches.includes(resultLower)) {
      setSearches(searches.concat(resultLower))
      AddSearchResultsFromStorage(resultLower)
    }
  }

  const deleteSearchResult = result => {
    const resultLower = result.toLowerCase()
    const temps = [...searches]
    const index = temps.indexOf(resultLower)
    if (index > -1) {
      temps.splice(index, 1)
      setSearches(temps)
      RemoveSearchResultsFromStorage(resultLower)
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
