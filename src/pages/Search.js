import React from 'react'
import SearchBar from '../components/SearchBar'
import styles from './Search.module.css'
import data from '../data/mock-laptop-data.json'
import classnames from 'classnames'
import InforList from '../components/InfoList'
import { useItemList } from '../hooks/useItemList'

export default function Search() {
  const properties = useItemList({ data: data, isProfile: false })

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
          You can search any available laptop within current database here.
          <br></br>
          Click on each lap top for more details.
        </p>
        <SearchBar onAddSearchTerm={properties.addSearchResult} />
      </div>
      {properties.searches.length > 0 ? <InforList {...properties} /> : null}
    </>
  )
}
