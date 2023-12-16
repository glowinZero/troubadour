import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import Playlists from './Pages/Playlists'
import Mood from './Pages/Mood'
import EditUser from './Pages/EditUser'

function App() {

  return (
    <div id="app">
      <div className='overlay-content'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/mood" element={<Mood/>}/>
          <Route path="/playlists/:userId/:mood" element={<Playlists/>}/>
          <Route path="/edit/:userId" element={<EditUser/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
