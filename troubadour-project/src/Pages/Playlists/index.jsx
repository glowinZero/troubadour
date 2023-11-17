import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Playlists() {
  const client_id = "57045c8caab548509de4307fd8995ec4";
  const redirect_URI = "https://fabulous-gnome-6f4332.netlify.app/playlists/:userId/:mood";
  const AUTH_END = "https://accounts.spotify.com/authorize";
  const response_type = "token";
  const [playlists, setPlaylists] = useState([]);
  const [playlistLink, setPlaylistLink] = useState("");
  const scope =
    "user-library-read%20playlist-read-private%20user-read-private%20streaming%20user-read-playback-state%20user-modify-playback-state";
  const JSONLink = "https://troubadour-backend.onrender.com/playlists";
  const navigate = useNavigate();
  const { userId, mood } = useParams();
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [savingPlaylist, setSavingPlaylist] = useState(false); // Added state to track saving status

  const searchArtist = async (searchMood, userId, playlistLink) => {
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
          setPlaylistLink(playlistId);

          if (playlistLink) {
            const requestBody = {
              url: `https://open.spotify.com/embed/playlist/${playlistLink}`,
              mood: searchMood,
              userId: userId,
            };

            try {
              await axios.post(`${JSONLink}`, requestBody);
              console.log("Playlist saved successfully");
            } catch (error) {
              console.error("Error saving playlist:", error);
            }
          }
        }
      } else {
        console.log("No playlists found");
      }
    } catch (error) {
      console.error("Error during artist search:", error);
    }
  };

  const handleSavePlaylist = () => {
    setSavingPlaylist(true); // Set saving status to true when the button is clicked
    setSearchKey(mood); // Update searchKey to trigger useEffect
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchKey || mood,
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
            setPlaylistLink(playlistId);
          }
        } else {
          console.log("No playlists found");
        }
      } catch (error) {
        console.error("Error during artist search:", error);
      }
    };

    fetchData();
  }, [userId, searchKey, mood, token]); // Include all relevant dependencies

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
    setSearchKey(newMood);

    if (newMood && JSONLink && userId) {
      searchArtist(newMood, userId, playlistLink);
    } else {
      console.log("none");
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [mood, userId, playlistLink]);

  return (
    <div id="playlist-page">
      {!token ? (
        <div>
          <h1>Please log into your Spotify to proceed</h1>
          <a
            href={`${AUTH_END}?client_id=${client_id}&redirect_uri=${redirect_URI}&scope=${scope}&response_type=${response_type}&show_dialog=true`}
          >
            Take me to Spotify
          </a>
        </div>
      ) : (
        <div>
          {console.log("token defined:", token)}
          {playlists.playlists ? (
            <div>
              <h1>Your Playlists</h1>
              {console.log(playlistLink, "playlistlink form")}
              <div id="embed-iframe">
                <iframe
                  title="Spotify Playlist"
                  style={{ borderRadius: "12px", marginRight: "200px" }}
                  src={`https://open.spotify.com/embed/playlist/${playlistLink}`}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <button onClick={handleSavePlaylist} disabled={savingPlaylist}>
                {savingPlaylist ? "Saving Playlist..." : "Save Playlist"}
              </button>
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