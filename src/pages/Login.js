import React, { useContext, useRef } from 'react'
import styles from './Login.module.css'
import classnames from 'classnames'

import { AuthContext } from '../contexts/AuthProvider'

export default function Login() {
  const { login } = useContext(AuthContext)
  const usernameRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    const username = usernameRef.current.value
    const password = passwordRef.current.value

    login(username, password)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>LOGIN</p>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
        ref={usernameRef}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        ref={passwordRef}
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
