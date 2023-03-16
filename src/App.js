import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import GeneralLayout from './layouts/GeneralLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import Status from './pages/Status'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Item from './pages/Item'
import Profile from './pages/Profile'
import AuthProvider from './contexts/AuthProvider'
import PasswordReset from './components/PasswordReset'
import PasswordCheckmark from './components/PasswordCheckmark'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <GeneralLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/status" element={<Status />} />
          <Route path="/#contact" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute redirectPath={'/login'}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/laptop/:slug" element={<Item />} />
          <Route
            path="/password-reset"
            element={
              <ProtectedRoute redirectPath={'/password-reset-checkmark'}>
                <PasswordReset />
              </ProtectedRoute>
            }
          />
          <Route
            path="/password-reset-checkmark"
            element={<PasswordCheckmark />}
          />
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </GeneralLayout>
    </AuthProvider>
  )
}

export default App
