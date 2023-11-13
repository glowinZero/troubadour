import { useEffect, useState } from "react"
import Playlists from "../../Pages/Playlists"

function PlaylistHistory(){
    const [playlists, setPlaylists] = useState();
    useEffect(() => {
      setPlaylists(Playlists);
    }, [])
    
    return(
        <div>
            <h1>Playlists:</h1>
            {playlists.map((playlist) => (
                <div key={playlist.id}> 
                    <p>{playlist.mood}</p>
                    <p>{playlist.source}</p>
                </div>
            ))}
        </div>
    )
}

export default PlaylistHistory