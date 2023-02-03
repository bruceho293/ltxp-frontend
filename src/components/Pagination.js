import React from 'react'
import { usePagination } from '../hooks/usePagination'
import styles from './Pagination.module.css'
import classnames from 'classnames'
import {
  FIRST_PAGE,
  PREV_PAGE,
  NEXT_PAGE,
  LAST_PAGE,
} from '../constants/global'
export const PAGE_SIZE = 5

export default function Pagination(props) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 3,
    currentPage,
    pageSize = PAGE_SIZE,
    className,
  } = props

  const paginationRange = usePagination({
    totalCount,
    siblingCount,
    currentPage,
    pageSize,
  })

  const item = (key, page, className, pageNumber) => {
    return (
      <li
        key={key}
        className={className}
        onClick={() => onPageChange(pageNumber)}
      >
        {page}
      </li>
    )
  }

  // If there's fewer than 2 times the currentRange, we don't render anything
  if (currentPage === 0 || paginationRange.length < 2) return null

  const firstPage = 1
  const lastPage = Math.ceil(totalCount / pageSize)

  // Display Condition
  const firstPageBtnVanish = currentPage - firstPage <= siblingCount
  const lastPageBtnVanish = lastPage - currentPage <= siblingCount

  return (
    <ul className={classnames(styles.container, { [className]: className })}>
      {paginationRange.map((page, idx) => {
        switch (page) {
          case FIRST_PAGE:
            return item(
              idx,
              page,
              classnames(styles.item, {
                [styles.itemVanish]: firstPageBtnVanish,
              }),
              firstPage
            )

          case PREV_PAGE:
            return item(
              idx,
              page,
              classnames(styles.item, {
                [styles.itemVanish]: currentPage === firstPage,
              }),
              currentPage - 1
            )

          case NEXT_PAGE:
            return item(
              idx,
              page,
              classnames(styles.item, {
                [styles.itemVanish]: currentPage === lastPage,
              }),
              currentPage + 1
            )

          case LAST_PAGE:
            return item(
              idx,
              page,
              classnames(styles.item, {
                [styles.itemVanish]: lastPageBtnVanish,
              }),
              lastPage
            )

          default:
            return item(
              idx,
              page,
              classnames(styles.pageItem, {
                [styles.pageSelected]: currentPage === page,
              }),
              page
            )
        }
      })}
    </ul>
  )
}
