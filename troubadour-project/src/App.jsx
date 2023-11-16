import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import Playlists from './Pages/Playlists'
import Mood from './Pages/Mood'
import EditUser from './Pages/EditUser'
import PlaylistHistory from './Components/History'
import Share from './Components/SocialShare'
import BlobAnimation from './Components/Background'

function App() {

  return (
    <div id="app">
      <div className='overlay-content'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/mood/:userId" element={<Mood/>}/>
          <Route path="/playlists" element={<Playlists/>}/>
          <Route path="/edit/:userId" element={<EditUser/>}/>
          <Route path="/history/:userId" element={<PlaylistHistory/>}/>
          <Route path="/socialShare" element={<Share/>}/>
        </Routes>
        <BlobAnimation id="background"/>
      </div>
    </div>
  )
}

export default App
