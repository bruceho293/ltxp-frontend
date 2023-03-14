import React, { useContext, useRef } from 'react'
import styles from './PasswordReset.module.css'
import classnames from 'classnames'

import { AuthContext } from '../contexts/AuthProvider'

export default function PasswordReset() {
  const { resetPassword, error } = useContext(AuthContext)
  const newPasswordRef = useRef()
  const retypeNewPasswordRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPassword = newPasswordRef.current.value
    const retypeNewPassword = retypeNewPasswordRef.current.value

    resetPassword(newPassword, retypeNewPassword)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>Password Reset Page</p>
      {error && <p className={styles.errors}>{error}</p>}
      <label htmlFor="new-password">New Password</label>
      <input
        type="password"
        id="new-password"
        name="new-password"
        placeholder="Enter your new password"
        ref={newPasswordRef}
        required
      />
      <label htmlFor="retype-new-password">Retype New Password</label>
      <input
        type="password"
        id="retype-new-password"
        name="retype-new-password"
        placeholder="Re-enter your new password"
        ref={retypeNewPasswordRef}
        required
      />
      <button className={styles.btn} type="submit" value="submit">
        SAVE PASSWORD
      </button>
    </form>
  )
}
