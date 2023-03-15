import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import styles from './PasswordCheckmark.module.css'

export default function PasswordCheckmark() {
  const [isEmailElseCurrentPassword, setIsEmailElseCurrentPassword] =
    useState(true)
  const { checkEmailOrCurrentPassword, error, isAuthenticated } =
    useContext(AuthContext)
  const checkInfoRef = useRef()

  useEffect(() => {
    setIsEmailElseCurrentPassword(!isAuthenticated)
  }, [])

  const currentField = useMemo(() => {
    return !isAuthenticated ? (
      <>
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          ref={checkInfoRef}
          required
        />
      </>
    ) : (
      <>
        <label htmlFor="current-password">Your Current Password</label>
        <input
          type="password"
          id="current-password"
          name="current-password"
          placeholder="Enter your current password"
          ref={checkInfoRef}
          required
        />
      </>
    )
  }, [isAuthenticated])

  const handleSubmit = (e) => {
    e.preventDefault()
    const checkInfo = checkInfoRef.current.value
    checkEmailOrCurrentPassword(isEmailElseCurrentPassword, checkInfo)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>Password Reset Page</p>
      {error && <p className={styles.errors}>{error}</p>}
      {currentField}
      <button className={styles.btn} type="submit" value="submit">
        CONFIRM
      </button>
    </form>
  )
}
