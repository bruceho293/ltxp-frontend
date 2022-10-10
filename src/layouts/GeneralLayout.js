import React from 'react'
import Header from './Header'
import styles from './GeneralLayout.module.css'

export default function GeneralLayout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.container}>{children}</div>
    </>
  )
}
