import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import Playlists from './Pages/Playlists'

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/playlists" element={<Playlists/>}/>
      </Routes>
    </div>
  )
}

export default App
