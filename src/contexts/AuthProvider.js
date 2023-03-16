import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isLoggedIn') ?? false
  )
  const [passwordResetChecked, setPasswordResetChecked] = useState(false)
  const [username, setUsername] = useState(null)
  const [userImpression, setUserImpression] = useState(null)
  const [error, setError] = useState(null)

  // Temporary store the tokens in localStorage.
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token') ?? null
  )
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refresh_token') ?? null
  )

  const serverHost = process.env.REACT_APP_HOST
  const navigate = useNavigate()

  useEffect(function getSavedTokens() {
    let accessTok = localStorage.getItem('access_token')
    let refreshTok = localStorage.getItem('refresh_token')
    const loggedIn = accessTok != null && refreshTok != null
    const undefinedTokens = accessTok === undefined || refreshTok === undefined

    if (undefinedTokens) {
      localStorage.clear()
      return
    }

    if (loggedIn) {
      setAccessToken(accessTok)
      setRefreshToken(refreshTok)
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(
    function saveTokens() {
      if (refreshToken == null) {
        localStorage.clear()
        setIsAuthenticated(false)
      } else {
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
        localStorage.setItem('isLoggedin', true)
      }
    },
    [accessToken, refreshToken]
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
        setIsAuthenticated(true)
        setAccessToken(data.access_token)
        setRefreshToken(data.refresh_token)
        setUsername(username)
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

    const url = serverHost + '/api/user/revoke_token/'
    let refreshTok = refreshToken
    const data = new FormData()
    data.append('token', refreshTok)
    data.append('client_id', process.env.REACT_APP_OAUTH2_CLIENT_ID)

    axios
      .post(url, data, authConfig)
      .then(() => {
        setIsAuthenticated(false)
        setAccessToken(null)
        setRefreshToken(null)
      })
      .catch(function (error) {
        setError(error.response.data.error)
      })

    navigate('/')
  }

  const resetPassword = (newPassword, retypeNewPassword) => {
    if (newPassword === retypeNewPassword) {
      setError('Unmatched password')
      return
    }

    const url = serverHost + '/api/password-reset'

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
