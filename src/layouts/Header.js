import React, { useContext } from 'react'
import styles from './Header.module.css'
import avatarHolder from '../assets/images/avatar.svg'
import logoSrc from '../assets/images/logo.svg'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import CustomLink from '../components/CustomLink'
import { AuthContext } from '../contexts/AuthProvider'

export default function Header() {
  const [isToggled, setIsToggled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsToggled(false)
  }, [location])

  const { isAuthenticated, username } = useContext(AuthContext)
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <a href="/" className={styles.logo}>
          <img
            src={logoSrc}
            alt="Home Logo Icon"
            aria-label="Click Logo Icon to return to Home Page"
          />
        </a>
        <div
          className={styles.toggle_button}
          onClick={() => setIsToggled(!isToggled)}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <ul
          className={
            isToggled
              ? [styles.navlink, styles.active].join(' ')
              : styles.navlink
          }
        >
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/search">Search</CustomLink>
          <CustomLink to="/status">Status</CustomLink>
          <CustomLink to="/#contact">Contact</CustomLink>

          {isAuthenticated ? (
            <CustomLink to="/profile">
              <div className={styles.container}>
                <img
                  className={styles.imageIcon}
                  src={avatarHolder}
                  alt="Profile Avatar"
                  aria-label="Profile Avatar"
                />
                <p>{username}</p>
              </div>
            </CustomLink>
          ) : (
            <CustomLink to="/login">Login</CustomLink>
          )}
        </ul>
      </nav>
    </header>
  )
}
