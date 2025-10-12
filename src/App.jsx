import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './css/App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Nutrition from './pages/Nutrition'
import Workouts from './pages/Workouts'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/nutrition" element={<Nutrition />}/>
        <Route path="/workouts" element={<Workouts />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
