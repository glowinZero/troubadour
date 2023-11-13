import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import SpotifyPlayer from "react-spotify-web-playback"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App>
        <SpotifyPlayer/>
      </App>
    </Router>
  </React.StrictMode>,
)
