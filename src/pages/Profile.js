import React from 'react'
import styles from './Profile.module.css'
import avatarHolder from '../assets/images/avatar.svg'
import InforList from '../components/InfoList'

export default function Profile() {
  return (
    <>
      <div className={styles.container}>
        <h2>Your Profile</h2>
        <div className={styles.section}>
          <a href="/">
            <img
              className={styles.imageIcon}
              src={avatarHolder}
              alt="Profile Avatar"
              aria-label="Profile Avatar"
            />
          </a>

          <form className={styles.settings}>
            <label htmlFor="username">Username</label>
            <p>:</p>
            <input type="text" id="username" name="username" />
            <label htmlFor="email">Email</label>
            <p>:</p>
            <input
              type="email"
              id="email"
              name="email"
              // value="example@gmail.com"
            />
            <label htmlFor="password">Password</label>
            <p>:</p>
            <input
              type="password"
              id="password"
              name="password"
              // value="example123456789)("
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <div className={styles.container}>
        <h2>Your Interest</h2>
        <InforList />
      </div>
    </>
  )
}
