import React, { useState, createContext } from 'react'
import axios from 'axios'
export const AuthContext = createContext()

const mockUserData = {
  gmail: 'test@test.com',
  password: '123456789',
}

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const login = (username, password) => {
    // setIsAuthenticated(true)
    const url = 'http://localhost:8000/user/login/'
    const data = {
      username: username,
      password: password,
      code_challenge: 'GVQ0cbVKJbia8zsGoFxBC_qUON6lgFhyWj3lOxIzHHg',
    }

    const config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }

    axios
      .post(url, data, config)
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
