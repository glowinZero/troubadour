import { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import Share from '../SocialShare';
import axios from 'axios';
const JSONLink = "http://localhost:5178/playlists"

function PlaylistHistory() {
  // eslint-disable-next-line no-unused-vars
  const [playlists, setPlaylists] = useState([]);

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


  return (
    <div id="list-playlists" key="playlistkey">
      {playlists.map((playlist) => (
        <Collapsible id="accordeon" key={playlist.id} trigger={playlist.mood}>
          <p>
            This is the content for the playlist with URL: {playlist.url}
          </p>
          <button onClick={() => deletePlaylist(playlist.id)}>Delete</button>
          <Share/>
        </Collapsible>
      ))}
    </div>
  );
}

export default PlaylistHistory;