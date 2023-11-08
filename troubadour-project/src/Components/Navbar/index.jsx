import { Link } from "react-router-dom"
import '../../App.css'
import axios from "axios"
import { useState } from "react"

const userApi = "http://localhost:5178"

function Navbar () {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        const requestBody = {username, password};
        axios.post(`${userApi}/users`, requestBody).then(()=>{
            setUsername("")
            setPassword("")
        }
        ).catch(error=>{console.log(error)})
    }
    return (
        <nav id="navbar">
            <Link to="/playlists">Playlist</Link>
            <form onSubmit={handleSubmit}>
                <h4>Signup</h4>
                <label><input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/></label>
                <label><input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/></label>
                <button type="submit">Submit</button>
            </form>
        </nav>
    )
}

export default Navbar