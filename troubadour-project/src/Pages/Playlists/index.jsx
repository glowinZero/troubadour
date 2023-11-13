import Login from "../Login"
import { useState, useEffect } from "react"
import axios from "axios"
import SpotifyPlayer from "react-spotify-web-playback"
import { useNavigate, useParams } from "react-router-dom"


function Playlists(){
    const navigate = useNavigate();
    const {userId} = useParams();
    console.log("userId:", userId)
    const {mood} = useParams();
    useEffect(() => {
        if(userId !== ":userId") {localStorage.setItem("userId", userId)}
        if(mood !== ":mood") {localStorage.setItem("mood", mood)}
        const newUser = localStorage.getItem("userId");
        const newMood = localStorage.getItem("mood")
        console.log("newUser:", newUser, "newModd", mood);
        if(userId === ":userId" || mood === ":mood"){navigate(`/playlists/${newUser}/${newMood}`)}
        const script = document.createElement('script');
        script.src = 'https://open.spotify.com/embed/iframe-api/v1';
        script.async = true;
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);

    //Variables
    const client_id = "57045c8caab548509de4307fd8995ec4"
    const client_secret = "f8275ac2c7944282a8c10a3b9a2b3ae8"
    const redirect_URI = "http://localhost:5173/playlists/:userId/:mood"
    const AUTH_END = "https://accounts.spotify.com/authorize"
    const response_type = "token"
    const [playlists, setPlaylists] = useState([])
    const [playlistLink, setPlaylistLink] = useState()
    const scope = "user-library-read%20playlist-read-private%20user-read-private%20streaming%20user-read-playback-state%20user-modify-playback-state"


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

            console.log(token)
            console.log(hash)
        }
        setToken(token)
    }, [])

    //Logout function
    const logout = () => {
        setToken()
        window.localStorage.removeItem("token")
    }

    //Search Artists function (connecting to API here)
    const searchArtist = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchKey,
                    type: "playlist"
                }
            });
            
            const data = response.data;
            setPlaylists(data)
            setPlaylistLink (playlists.playlists.items[0].external_urls.spotify)
            setPlaylistLink (playlistLink.split('/playlist/')[1])
            console.log(data)
            
    
        } catch (error) {
            console.error("Error during artist search:", error);
        }
    };
    
    //If we dont have a token, user is prompted to login to spotify, so we can get it. If we are already logged in, the user can log out. 
    return (<div>
        <h1>Your Playlists</h1>
{/*         {playlists.playlists.items[0].external_urls.spotify} */}
        {!token ?
        <a href={`${AUTH_END}?client_id=${client_id}&redirect_uri=${redirect_URI}&scope=${scope}&response_type=${response_type}&show_dialog=true`}>Login to Spotify</a>
        : <button onClick={logout}>Logout</button>}
        {token?
        <div>
        <form onSubmit={searchArtist}>
            <input type="text" onChange={e => setSearchKey(e.target.value)} />
            <button type="submit">Search</button>
            {playlists.playlists ?
            <div>
                <p>{playlistLink}</p>
                <div id="embed-iframe">
                    <iframe
                    title="Spotify Playlist"
                    style={{ borderRadius: '12px', marginRight: '200px' }}
                    src={`https://open.spotify.com/embed/playlist/${playlistLink}`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    ></iframe>
                </div>
            </div>
            : <div>
                {console.log('caught undefined')}
                </div>}
                <div>
            </div>
        </form>
        </div>
        : <h2>Please Login</h2>}
    </div>)
}

export default Playlists