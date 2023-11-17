import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Collapsible from "react-collapsible";

function Playlists() {
  const client_id = "57045c8caab548509de4307fd8995ec4";
  const AUTH_END = "https://accounts.spotify.com/authorize";
  const response_type = "token";
  const JSONLink = "https://troubadour-backend.onrender.com/playlists";
  const navigate = useNavigate();
  const { userId, mood } = useParams();
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const searchArtist = async (searchMood, userId) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchMood,
          type: "playlist",
        },
      });
      const data = response.data;

      if (data.playlists && data.playlists.items.length > 0) {
        let randomIndex = Math.floor(Math.random() * 10);
        const firstPlaylist = data.playlists.items[randomIndex];

        if (firstPlaylist.external_urls && firstPlaylist.external_urls.spotify) {
          const playlistId = firstPlaylist.external_urls.spotify.split("/playlist/")[1];
          savePlaylist(playlistId, searchMood, userId);
        }
      } else {
        console.log("No playlists found");
      }
    } catch (error) {
      console.error("Error during artist search:", error);
    }
  };

  const savePlaylist = async (playlistId, searchMood, userId) => {
    const requestBody = {
      url: `https://open.spotify.com/embed/playlist/${playlistId}`,
      mood: searchMood,
      userId: userId,
    };

    try {
      await axios.post(`${JSONLink}`, requestBody);
      console.log("Playlist saved successfully");
    } catch (error) {
      console.error("Error saving playlist:", error);
    }
  };

  const deletePlaylist = async (playlistId) => {
    // Add your logic to delete the playlist
    try {
      await axios.delete(`${JSONLink}/${playlistId}`);
      console.log("Playlist deleted successfully");
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: mood,
            type: "playlist",
          },
        });

        const data = response.data;
        setPlaylists(data);

        if (data.playlists && data.playlists.items.length > 0) {
          let randomIndex = Math.floor(Math.random() * 10);
          const firstPlaylist = data.playlists.items[randomIndex];

          if (firstPlaylist.external_urls && firstPlaylist.external_urls.spotify) {
            const playlistId = firstPlaylist.external_urls.spotify.split("/playlist/")[1];
            savePlaylist(playlistId, mood, userId);
          }
        } else {
          console.log("No playlists found");
        }
      } catch (error) {
        console.error("Error during artist search:", error);
      }
    };

    fetchData();
  }, [userId, mood, token]);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem("token");
    if (userId !== ":userId") localStorage.setItem("userId", userId);
    if (mood !== ":mood") localStorage.setItem("mood", mood);
    const newUser = localStorage.getItem("userId");
    const newMood = localStorage.getItem("mood");

    if (userId === ":userId" || mood === ":mood") {
      navigate(`/playlists/${newUser}/${newMood}`);
    }

    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);

    if (!storedToken && hash) {
      storedToken = hash.substring(1).split("&").find((e) => e.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", storedToken);
    }

    setToken(storedToken);

    if (newMood && JSONLink && userId) {
      searchArtist(newMood, userId);
    } else {
      console.log("none");
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [userId, mood, token]);

  return (
    <div id="playlist-page">
      {!token ? (
        <div>
          <h1>Please log into your Spotify to proceed</h1>
          <a
            href={`${AUTH_END}?client_id=${client_id}&response_type=${response_type}&show_dialog=true`}
          >
            Take me to Spotify
          </a>
        </div>
      ) : (
        <div>
          {playlists.length > 0 ? (
            <div>
              <h1>Your Playlists</h1>
              {playlists.map((playlist) => (
                <Collapsible
                  key={playlist.id}
                  trigger={playlist.mood}
                  classParentString="closed-accordion"
                  closedclassActive="open-accordion"
                >
                  <div style={{ color: "white" }}>
                    <div id="embed-iframe">
                      <iframe
                        title="Spotify Playlist"
                        style={{ borderRadius: "12px", marginRight: "10px" }}
                        src={playlist.url}
                        width="80%"
                        height="200px"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    </div>
                  </div>
                  <div id="buttons-history">
                    <button
                      style={{ marginTop: "0px", marginBottom: "0" }}
                      onClick={() => deletePlaylist(playlist.id)}
                    >
                      Delete
                    </button>
                    <Share />
                  </div>
                </Collapsible>
              ))}
            </div>
          ) : (
            <div>{console.log("caught undefined")}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Playlists;