import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // Temporary store the tokens in localStorage.
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)

  useEffect(function getSavedTokens() {
    let accessTok = localStorage.getItem('access_token')
    let refreshTok = localStorage.getItem('refresh_token')
    if (accessTok != null) setAccessToken(accessTok)
    if (refreshTok != null) setRefreshToken(refreshTok)
  }, [])

  useEffect(
    function saveTokens() {
      if (refreshToken == null) {
        localStorage.clear()
      } else {
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
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
    setIsAuthenticated(true)

    const url = 'http://localhost:8000/user/token/'
    const data = new FormData()
    data.append('username', username)
    data.append('password', password)
    data.append('grant_type', 'password')
    data.append('client_id', process.env.REACT_APP_OAUTH2_CLIENT_ID)

    axios
      .post(url, data, authConfig)
      .then(response => {
        let data = response.data
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  const logout = () => {
    /*
    Create a logout reqeust to the backend with OAuth2 Django.
    */
    setIsAuthenticated(false)

    const url = 'http://localhost:8000/user/revoke_token/'
    const data = new FormData()
    let refreshTok = refreshToken
    data.append('token', refreshTok)
    data.append('client_id', process.env.REACT_APP_OAUTH2_CLIENT_ID)

    axios
      .post(url, data, authConfig)
      .then(response => {
        setAccessToken(null)
        setRefreshToken(null)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  }

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
