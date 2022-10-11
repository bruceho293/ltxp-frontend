import React, { useEffect, useMemo, useState } from 'react'
import styles from './InfoList.module.css'
import filterIcon from '../assets/images/filter.svg'
import InfoBar from '../components/InfoBar'

import Pagination from '../components/Pagination'
import data from '../data/mock-laptop-data.json'

import classnames from 'classnames'
import { useItemList } from '../hooks/useItemList'

const ASC_VALUE = 'asc'
const DESC_VALUE = 'desc'

export default function InforList() {
  const {
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
  } = useItemList({ data: data })

  return (
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
  )
}
