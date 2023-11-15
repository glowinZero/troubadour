const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=57045c8caab548509de4307fd8995ec4&response_type=code&redirect_uri=https://troubadour-backend.onrender.com:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
import React from 'react'

function Login() {
  return (
    <div>
       <a href="https://accounts.spotify.com/authorize?client_id=57045c8caab548509de4307fd8995ec4&response_type=code&redirect_uri=https://troubadour-backend.onrender.com:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"><button>Login</button></a> 
    </div>
  )
}

export default Login