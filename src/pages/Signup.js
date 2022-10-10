import React from 'react'
import styles from './Signup.module.css'

export default function Signup() {
  return (
    <form className={styles.form}>
      <p className={styles.title}>SIGN UP</p>
      <label htmlFor="email">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        required
      />
      <label htmlFor="password">Retype Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Retype your password"
        required
      />

      <button className={styles.btn} type="submit" value="submit">
        SIGN UP
      </button>
    </form>
  )
}
