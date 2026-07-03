import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import ResetPassword from './pages/Resetpassword'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  

  return (
    <>
    <Routes>
          <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />
    </Routes>
    </>
  )
}

export default App
