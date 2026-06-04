import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import ResetPassword from './pages/Resetpassword'

function App() {
  

  return (
    <>
    <Routes>
      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />
    </Routes>
    </>
  )
}

export default App
