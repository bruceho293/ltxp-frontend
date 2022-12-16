import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import styles from './Search.module.css'
import classnames from 'classnames'
import ItemList from '../components/ItemList'
import { useItemList } from '../hooks/useItemList'

export default function Search() {
  const properties = useItemList({ isProfile: false })

  return (
    <>
      <div
        className={classnames(styles.container, {
          [styles.full]: properties.searches.length === 0,
        })}
      >
        <p
          className={classnames(styles.title, {
            [styles.vanish]: properties.searches.length > 0,
          })}
        >
          You can search any available laptop in the database here.
          <br></br>
          Click on each laptop for more details.
        </p>
        <SearchBar onAddSearchTerm={properties.addSearchResult} />
      </div>
      {properties.searches.length > 0 ? <ItemList {...properties} /> : null}
    </>
  )
}
