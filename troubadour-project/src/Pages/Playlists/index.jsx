import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"


function Playlists(){
    
    //Variables
    const client_id = "57045c8caab548509de4307fd8995ec4"
    const client_secret = "f8275ac2c7944282a8c10a3b9a2b3ae8"
    const redirect_URI = "https://fabulous-gnome-6f4332.netlify.app"
    const AUTH_END = "https://accounts.spotify.com/authorize"
    const response_type = "token"
    const [playlists, setPlaylists] = useState([])
    const [playlistLink, setPlaylistLink] = useState("")
    const scope = "user-library-read%20playlist-read-private%20user-read-private%20streaming%20user-read-playback-state%20user-modify-playback-state"
    const JSONLink = "https://troubadour-backend.onrender.com/playlists"
    const navigate = useNavigate();
    const {userId} = useParams();
    const {mood} = useParams();
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")

    //Logout function
/*     const logout = () => {
        setToken()
        window.localStorage.removeItem("token")
    } */

    //Search Artists function (connecting to API here)
    const searchArtist = async (searchMood, JSONLink, userId) => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchMood,
                    type: "playlist"
                }
            });
    
            const data = response.data;
            setPlaylists(data);
    
            // Check if playlists and items exist before accessing them
            if (data.playlists && data.playlists.items.length > 0) {
                const firstPlaylist = data.playlists.items[0];
                if (firstPlaylist.external_urls && firstPlaylist.external_urls.spotify) {
                    // Extract the playlist ID
                    const playlistId = firstPlaylist.external_urls.spotify.split('/playlist/')[1];
                    setPlaylistLink(playlistId);
                    console.log(playlistLink, "playlistlink in try");
                    console.log("save playlist", searchMood, userId, JSONLink, playlistLink)
                    if (playlistLink){
                        const requestBody = {
                            url: `https://open.spotify.com/embed/playlist/${playlistLink}`,
                            mood: searchMood,
                            userId: userId
                        }
                        axios.post(JSONLink, requestBody)
                    }
                }
            } else {
                // Handle the case when no playlists are found
                console.log("No playlists found");
            }

        } catch (error) {
            console.error("Error during artist search:", error);
        }
    };

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")


        if(userId !== ":userId") {localStorage.setItem("userId", userId)}
        if(mood !== ":mood") {localStorage.setItem("mood", mood)}
        const newUser = localStorage.getItem("userId");
        const newMood = localStorage.getItem("mood");
        if(userId === ":userId" || mood === ":mood"){navigate(`/playlists/${newUser}/${newMood}`)}

        const script = document.createElement('script');
        script.src = 'https://open.spotify.com/embed/iframe-api/v1';
        script.async = true;
        document.body.appendChild(script);
        if (!token && hash){
            token = hash.substring(1).split("&").find(e=>e.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
        setSearchKey(newMood)   
        {newMood && JSONLink && userId?
        searchArtist(newMood, JSONLink, userId, playlistLink )
        :console.log("none")} 

        return () => {
          document.body.removeChild(script);
        };
      }, [playlistLink,userId,JSONLink,playlistLink, mood]);


    
    //If we dont have a token, user is prompted to login to spotify, so we can get it. If we are already logged in, the user can log out. 
    return (<div id="playlist-page">
        {!token ?
        <div>
        <h1>Please log into your Spotify to proceed</h1>
        <a href={`${AUTH_END}?client_id=${client_id}&redirect_uri=${redirect_URI}&scope=${scope}&response_type=${response_type}&show_dialog=true`}
        >Take me to Spotify</a>
        </div>
        : <div></div>}
        {token?
        <div>
            {console.log('token defined:', token)}
            {playlists.playlists ?
            <div>
                <h1>Your Playlists</h1>
                {console.log(playlistLink, "playlistlink form")}
                <div id="embed-iframe">
                    <iframe
                    title="Spotify Playlist"
                    style={{ borderRadius: '12px', marginRight: '200px' }}
                    src={`https://open.spotify.com/embed/playlist/${playlistLink}`}
                    width="100%"
                    height="600"
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
        </div>
        : console.log("test")}
    </div>)
}

export default Playlists