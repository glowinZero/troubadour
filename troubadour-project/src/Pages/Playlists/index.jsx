import Login from "../Login"
import { useState, useEffect } from "react"
import axios from "axios"


function Playlists(){
    //Variables
    const client_id = "57045c8caab548509de4307fd8995ec4"
    const client_secret = "f8275ac2c7944282a8c10a3b9a2b3ae8"
    const redirect_URI = "http://localhost:5173/playlists"
    const AUTH_END = "https://accounts.spotify.com/authorize"
    const response_type = "token"


    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")

    //Get the access token from URL
    useEffect(()=>{
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash){
            token = hash.substring(1).split("&").find(e=>e.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])

    //Logout function
    const logout = () => {
        setToken()
        window.localStorage.removeItem("token")
    }

    //Search Artists function (connecting to API here)
    const searchArtists = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchKey,
                    type: "artist"
                }
            });

            
            const data = response.data;
            console.log(data)
    
        } catch (error) {
            console.error("Error during artist search:", error);
        }
    };
    
    //If we dont have a token, user is prompted to login to spotify, so we can get it. If we are already logged in, the user can log out. 
    return (<div>
        <h1>Your Playlists</h1>
        {!token ?
        <a href={`${AUTH_END}?client_id=${client_id}&redirect_uri=${redirect_URI}&response_type=${response_type}`}>Login to Spotify</a>
        : <button onClick={logout}>Logout</button>}

        {token ?
        <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type="submit">Search</button>
        </form>
        : <h2>Please Login</h2>}
    </div>)
}

export default Playlists