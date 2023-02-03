import { useMemo } from 'react'
import {
  NEXT_PAGE,
  PREV_PAGE,
  FIRST_PAGE,
  LAST_PAGE,
} from '../constants/global'

const range = (start, end) => {
  let length = end - start + 1
  /*
        Create an array with a certain length and set elements from start value to end value. 
    */
  return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /*
            Case 1: If the number of pages is less than the number of pages
            we want to show in the pagination component.
        */
    if (totalPageCount < pageSize) {
      return range(1, totalPageCount)
    }

    // Case 2: When First Page is chosen
    if (currentPage === firstPageIndex) {
      let pages = range(firstPageIndex, firstPageIndex + siblingCount)
      return [...pages, NEXT_PAGE, LAST_PAGE]
    }

    // Case 3: When Last Page is chosen
    if (currentPage === lastPageIndex) {
      let pages = range(lastPageIndex - siblingCount, lastPageIndex)
      return [FIRST_PAGE, PREV_PAGE, ...pages]
    }

    // Case 4a: When Previous Button appears but not the First Button
    if (currentPage - firstPageIndex <= siblingCount) {
      let currentLastPageIdx =
        currentPage + siblingCount >= lastPageIndex
          ? lastPageIndex
          : currentPage + siblingCount
      let pages = range(firstPageIndex, currentLastPageIdx)

      if (currentLastPageIdx === lastPageIndex)
        return [PREV_PAGE, ...pages, NEXT_PAGE]
      return [PREV_PAGE, ...pages, NEXT_PAGE, LAST_PAGE]
    }

    // Case 4b: When Next Button appears but not the Last Button
    else if (lastPageIndex - currentPage <= siblingCount) {
      let currentFirstPageIdx =
        currentPage - siblingCount <= firstPageIndex
          ? firstPageIndex
          : currentPage - siblingCount
      let pages = range(currentFirstPageIdx, lastPageIndex)
      if (currentFirstPageIdx === firstPageIndex)
        return [PREV_PAGE, ...pages, NEXT_PAGE]
      return [FIRST_PAGE, PREV_PAGE, ...pages, NEXT_PAGE]
    }

    // Case 5: When both Previous Button and First Button appear
    else {
      let pages = range(currentPage - siblingCount, currentPage + siblingCount)
      return [FIRST_PAGE, PREV_PAGE, ...pages, NEXT_PAGE, LAST_PAGE]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange
}
