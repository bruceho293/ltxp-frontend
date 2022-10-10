import React from 'react'
import styles from './Status.module.css'

export default function Status() {
  const item = (
    <li className={styles.item}>
      <p>00:00:00</p>
      <div className={styles.circle}></div>
      <p>Status Comment here</p>
    </li>
  )

  return (
    <div className={styles.container}>
      <p className={styles.headingOne}>Server Status</p>
      <p>Timezone</p>
      <div className={styles.section}>
        <div className={styles.subsection}>
          <p className={styles.headingTwo}>July 20th, 2022</p>
          <div className={styles.line}></div>
          <ul className={styles.list}>
            {item}
            {item}
            {item}
            {item}
            {item}
          </ul>
        </div>
        <div className={styles.subsection}>
          <p className={styles.headingTwo}>July 19th, 2022</p>
          <div className={styles.line}></div>
          <ul className={styles.list}>
            {item}
            {item}
            {item}
            {item}
            {item}
          </ul>
        </div>
        <div className={styles.subsection}>
          <p className={styles.headingTwo}>July 18th, 2022</p>
          <div className={styles.line}></div>
          <ul className={styles.list}>
            {item}
            {item}
            {item}
            {item}
            {item}
          </ul>
        </div>
      </div>
    </div>
  )
}
