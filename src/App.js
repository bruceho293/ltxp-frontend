import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import GeneralLayout from './layouts/GeneralLayout'
import Home from './pages/Home'
import Search from './pages/Search'
import Status from './pages/Status'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Item from './pages/Item'
import Profile from './pages/Profile'

function App() {
  return (
    <GeneralLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/status" element={<Status />} />
        <Route path="/#contact" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/laptop/:slug" element={<Item />} />
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
  )
}

export default App
