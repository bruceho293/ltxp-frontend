import React, { useEffect, useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar'
import styles from './Search.module.css'
import filterIcon from '../assets/images/filter.svg'
import InfoBar from '../components/InfoBar'
import { CreateRegexFromString } from '../util'
import Pagination, { PAGE_SIZE } from '../components/Pagination'
import data from '../data/mock-laptop-data.json'
import { LIKE, DISLIKE, NEUTRAL } from '../components/LikeDislikeButton.js'
import classnames from 'classnames'

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

const filtersTemplate = [
  filterJson(1, 'Price', 'price', 'cost'),
  filterJson(2, 'Ext Comparison Price', 'extComparePrice', 'costDiff'),
  filterJson(3, 'Last Update Day', 'LUD', 'update'),
]

export default function Search() {
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

  return (
    <>
      <div
        className={classnames(styles.container, {
          [styles.full]: searches.length === 0,
        })}
      >
        <p
          className={classnames(styles.title, {
            [styles.vanish]: searches.length > 0,
          })}
        >
          You can search any available laptop within current database here.
          <br></br>
          Click on each lap top for more details.
        </p>
        <SearchBar onAddSearchTerm={addSearchResult} />
      </div>
      {searches.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.section}>
            <div className={styles.topbar}>
              <p className={styles.qnty}>{laptops.length} Items</p>
              <div className={styles.filter}>
                <div
                  className={styles.toggleBtn}
                  onClick={() => setFilterShown(!filterShown)}
                >
                  <img
                    className={styles.icon}
                    src={filterIcon}
                    alt="Filter Icon"
                    aria-label="Filter Icon"
                  />
                  Filter
                </div>
                <div
                  className={classnames(styles.filterOptions, {
                    [styles.vanish]: !filterShown,
                  })}
                >
                  {filters.map(filter => (
                    <div className={styles.filterOption} key={filter.fid}>
                      <label htmlFor={filter.label}>{filter.title}</label>
                      <div
                        className={classnames(styles.filterValue, {
                          [styles.chosen]: filter.active && filter.isAsc,
                        })}
                        data-value={ASC_VALUE}
                        data-fid={filter.fid}
                        onClick={addFilter}
                      >
                        {filter.ascLabel}
                      </div>
                      <div
                        className={classnames(styles.filterValue, {
                          [styles.chosen]: filter.active && !filter.isAsc,
                        })}
                        data-value={DESC_VALUE}
                        data-fid={filter.fid}
                        onClick={addFilter}
                      >
                        {filter.descLabel}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.bar}></div>
            <div className={styles.bottombar}>
              <div className={classnames(styles.halfbar, styles.searches)}>
                {searches.map((result, idx) => (
                  <InfoBar
                    key={idx}
                    color="#4AED5A"
                    content={result}
                    onDeleteSearchTerm={deleteSearchResult}
                  />
                ))}
              </div>
              <div className={classnames(styles.halfbar, styles.filters)}>
                {filters.map(filter => {
                  if (filter.active)
                    return (
                      <InfoBar
                        key={filter.fid}
                        isFilter
                        filterID={filter.fid}
                        color="#9B29E1"
                        content={`${filter.title}: ${
                          filter.isAsc ? filter.ascLabel : filter.descLabel
                        }`}
                        onDeleteFilter={deleteFilter}
                      />
                    )
                  return null
                })}
              </div>
            </div>
          </div>
          <div className={styles.section}>
            {currentData.map(data => (
              <InfoBar
                key={data.id}
                isLaptop
                color="#D3951C"
                content={data}
                onImpChange={updateLaptopImp}
              />
            ))}
            <Pagination
              currentPage={currentPage}
              totalCount={laptops.length}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
