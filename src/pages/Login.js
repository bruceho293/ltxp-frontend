import React, { useContext } from 'react'
import styles from './Login.module.css'
import classnames from 'classnames'

import { AuthContext } from '../contexts/AuthProvider'

export default function Login() {
  const { login } = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault()
    login()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>LOGIN</p>
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
      <div className={styles.group}>
        <input type="checkbox" id="save-user" name="save-user" />
        <label htmlFor="save-user">Remember me?</label>
      </div>

      <button className={styles.btn} type="submit" value="submit">
        LOGIN
      </button>
      <a className={styles.btnLink} href="/">
        Forgot Password?
      </a>
      <p className={classnames(styles.group, styles.groupCenter)}>
        Need an account?{' '}
        <a className={styles.btnLink} href="/signup">
          <u>SIGN UP HERE</u>
        </a>
      </p>
    </form>
  )
}
