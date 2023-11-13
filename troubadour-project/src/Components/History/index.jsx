import React, { useState } from 'react';
import Collapsible from 'react-collapsible';

function PlaylistHistory() {
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
        <Collapsible key={playlist.id} trigger={playlist.mood}>
          <p>
            This is the content for the playlist with URL: {playlist.url}
          </p>
        </Collapsible>
      ))}
    </div>
  );
}

export default PlaylistHistory;