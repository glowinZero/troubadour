import { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import Share from '../SocialShare';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const JSONLink = "https://troubadour-backend.onrender.com/playlists"


function PlaylistHistory() {
  // eslint-disable-next-line no-unused-vars
  const [playlists, setPlaylists] = useState([]);
  useEffect (()=>{
    const userId = localStorage.getItem("userId");
    axios.get (JSONLink)
    .then((response)=>{
      setPlaylists((prevPlaylists) => {
        const filteredPlaylist = response.data.filter((playlist)=>
          playlist.userId.includes(userId)
          );
          return filteredPlaylist
        });
      })
    .catch(error=>
      {console.log(error)})
  }, [JSONLink])

  console.log(playlists)


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
    <div id="history" key="playlistkey">
      <h1>Your saved playlists</h1>
      <div id="historylist">
      {playlists.map((playlist) => (
        <Collapsible id="accordeon" key={playlist.id} trigger={playlist.mood}>
          <div id="accordeonContent"style={{color: "white"}}>
          <button style={{ marginTop: '0px', marginBottom: '0' }}onClick={() => deletePlaylist(playlist.id)}>Delete</button>
          <Share/>
            <div id="embed-iframe">
                    <iframe
                    title="Spotify Playlist"
                    style={{ borderRadius: '12px', marginRight: '10px'}}
                    src={playlist.url}
                    width="80%"
                    height="200px"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    loading="lazy"
                    ></iframe>
                </div> 
          </div>

        </Collapsible>
      ))}
      </div>
    </div>
  );
}

export default PlaylistHistory;