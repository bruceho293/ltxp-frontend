import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordResetChecked, setPasswordResetChecked] = useState(false)
  const [username, setUsername] = useState(null)
  const [userImpression, setUserImpression] = useState(null)
  const [error, setError] = useState(null)

  // Temporary store the tokens in localStorage.
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)

  const serverHost = process.env.REACT_APP_HOST
  const navigate = useNavigate()

  useEffect(function getSavedTokens() {
    let accessTok = localStorage.getItem('access_token')
    let refreshTok = localStorage.getItem('refresh_token')
    if (accessTok != null && accessTok !== undefined) setAccessToken(accessTok)
    if (refreshTok != null && refreshTok !== undefined)
      setRefreshToken(refreshTok)
  }, [])

  useEffect(
    function saveTokens() {
      if (refreshToken == null && !isAuthenticated) {
        localStorage.clear()
      } else {
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
      }
    },
    [accessToken, refreshToken, isAuthenticated]
  )

  const authConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  const login = (username, password) => {
    /*
    Create a login request to the backend with Oauth2 Django.
    */

    const url = serverHost + '/api/user/token/'
    const data = new FormData()
    data.append('username', username)
    data.append('password', password)
    data.append('grant_type', 'password')
    data.append('client_id', process.env.REACT_APP_OAUTH2_CLIENT_ID)

    axios
      .post(url, data, authConfig)
      .then((response) => {
        let data = response.data
        console.log(data)
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        setUsername(username)
        setIsAuthenticated(true)
        setError(null)
        navigate(-1)
      })
      .catch(function (error) {
        // console.log(error.response)
        setError(error.response.data.error)
      })
  }

  const logout = () => {
    /*
    Create a logout reqeust to the backend with OAuth2 Django.
    */
    setIsAuthenticated(false)

    const url = serverHost + '/api/user/revoke_token/'
    let refreshTok = refreshToken
    const data = new FormData()
    data.append('token', refreshTok)
    data.append('client_id', process.env.REACT_APP_OAUTH2_CLIENT_ID)

    axios
      .post(url, data, authConfig)
      .then(() => {
        setAccessToken(null)
        setRefreshToken(null)
      })
      .catch(function (error) {
        // console.log(error)
        setError(error.response.error)
      })

    navigate('/')
  }

  const resetPassword = (newPassword, retypeNewPassword) => {
    if (newPassword === retypeNewPassword) {
      setError('Unmatched password')
      return
    }

    const url = serverHost + '/api/password_reset'

    const data = new FormData()
    data.append('new-password', newPassword)
    data.append('retype-new-password', retypeNewPassword)

    axios.post(url, data, authConfig).then(() => {})
  }

  const checkEmailOrCurrentPassword = (isEmailElseCurrentPassword, info) => {
    const emailURL = serverHost + '/api/check-email'
    const currentPasswordURL = serverHost + '/api/check-password'

    const url = isEmailElseCurrentPassword ? emailURL : currentPasswordURL

    const data = new FormData()
    data.append('information', info)
    setPasswordResetChecked(false)
    axios
      .post(url, data, authConfig)
      .then(() => {
        setPasswordResetChecked(true)
        navigate('/password-reset')
      })
      .catch((error) => setError(error.response.error))
  }

  const value = {
    isAuthenticated,
    username,
    userImpression,
    error,
    login,
    logout,
    resetPassword,
    checkEmailOrCurrentPassword,
  }

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
