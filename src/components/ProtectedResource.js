import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'

export default function ProtectedResource({ redirectPath, children }) {
  const { isAuthenticated, passwordResetChecked } = useContext(AuthContext)

  console.log(isAuthenticated)
  console.log(localStorage.getItem('isLoggedIn'))
  const condNotMeet =
    redirectPath === '/login' ? !isAuthenticated : !passwordResetChecked

  if (condNotMeet) return <Navigate to={redirectPath} replace />

  return children
}
