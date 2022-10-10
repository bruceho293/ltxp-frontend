import React, { useState } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar(props) {
  const [searchVal, setSearchVal] = useState('')

  const handleClick = e => {
    e.preventDefault()
    if (searchVal === '')
      alert('Please fill in a name of the laptop in the search box !!')
    else props.onAddSearchTerm(searchVal.trim())
  }

  return (
    <form className={styles.form}>
      <label className={styles.visualyHidden} htmlFor="ltq">
        Laptop Search
      </label>
      <input
        type="search"
        id="ltq"
        name="name"
        placeholder="Enter name here"
        value={searchVal}
        onChange={e => setSearchVal(e.target.value)}
        required
      />
      <button type="submit" value="submit" onClick={e => handleClick(e)}>
        Laptop
      </button>
    </form>
  )
}
