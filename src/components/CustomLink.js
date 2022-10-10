import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CustomLink.module.css'

export default function CustomLink({ to, children }) {
  return (
    <li className={styles.link}>
      <Link to={to}>{children}</Link>
    </li>
  )
}
