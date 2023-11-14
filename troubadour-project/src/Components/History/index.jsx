import { useState } from 'react';
import Collapsible from 'react-collapsible';

function PlaylistHistory() {
  // eslint-disable-next-line no-unused-vars
  const [playlists, setPlaylists] = useState([
    {
      url: "https://niceplaylist.com",
      mood: "happy",
      userId: "1",
      id: 1
    },
    {
      url: "https://sadplaylist.com",
      mood: "sad",
      userId: "1",
      id: 2
    }
  ]);

  return (
    <div id="list-playlists">
      {playlists.map((playlist) => (
        <Collapsible id="accordeon" key={playlist.id} trigger={playlist.mood}>
          <p>
            This is the content for the playlist with URL: {playlist.url}
          </p>
        </Collapsible>
      ))}
    </div>
  );
}

export default PlaylistHistory;