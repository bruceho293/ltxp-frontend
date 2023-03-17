import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'

export default function ProtectedResource({ redirectPath, children }) {
  const { isAuthenticated, passwordResetChecked } = useContext(AuthContext)

  if (
    (redirectPath !== '/login' && !passwordResetChecked) ||
    (redirectPath === '/login' && !isAuthenticated)
  )
    return <Navigate to={redirectPath} replace />

  return children
}
