import { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import Share from '../SocialShare';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const JSONLink = "https://troubadour-backend.onrender.com/playlists"

function PlaylistHistory() {
  // eslint-disable-next-line no-unused-vars
  const [playlists, setPlaylists] = useState([]);
  const {userId} = useParams()

  useEffect (()=>{
    axios.get (JSONLink).then((response)=>{
      setPlaylists(response.data)
    })
    .catch(error=>{console.log(error)})
  }, [])

  const deletePlaylist = (playlistId) => {
    axios
    .delete(`${JSONLink}/${playlistId}`)
    .then(() => {
      // Update state to remove the deleted playlist
      setPlaylists((prevPlaylists) =>
        prevPlaylists.filter((playlist) => playlist.id !== playlistId)
      );
    })
    .catch((error) => console.error(error));
};

//apply filter by user id to display specific user history.
  return (
    <div id="list-playlists" key="playlistkey">
      {playlists.map((playlist) => (
        <Collapsible style={{color: "white"}} id="accordeon" key={playlist.id} trigger={playlist.mood}>
          <p style={{color: "white"}}>
            This is the content for the playlist with URL: {playlist.url}
            <div id="embed-iframe">
                    <iframe
                    title="Spotify Playlist"
                    style={{ borderRadius: '12px', marginRight: '200px', marginTop: '20px' }}
                    src={playlist.url}
                    width="100%"
                    height="200"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    ></iframe>
                </div>
          </p>
          <button onClick={() => deletePlaylist(playlist.id)}>Delete</button>
          <Share/>
        </Collapsible>
      ))}
    </div>
  );
}

export default PlaylistHistory;