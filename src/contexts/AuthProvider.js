import React, { useState, createContext, useMemo } from 'react'
import axios from 'axios'
export const AuthContext = createContext()

const mockUserData = {
  gmail: 'test@test.com',
  password: '123456789',
}

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const config = useMemo(() => {
    return {
      headers: {
        'x-user': user,
      },
    }
  }, [user])

  const login = (username, password) => {
    /*
    TODO: Create a login request from the backend with Oauth2 and DRF.
    */
    // setIsAuthenticated(true)

    const loginUrl = 'http://localhost:8000/user/login/'
    const authorizeUrl = 'http://localhost:8000/user/authorize/'
    const data = {
      username: username,
      password: password,
    }

    axios
      .post(loginUrl, data)
      .then(response => {
        console.log(response)
        let _user = response.data['user']
        setUser(_user)
        let tempConfig = {
          headers: {
            'x-user': _user,
          },
        }
        return axios.get(authorizeUrl + '?code_challenge=abc', tempConfig)
      })
      .then(response => {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  const logout = () => {
    setIsAuthenticated(false)
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
