import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

function Mood () {
    const navigate = useNavigate()
    const user = useParams();
    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=57045c8caab548509de4307fd8995ec4&response_type=code&redirect_uri=http://localhost:5173&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
    const [mood, setMood] = useState();
    const handleSubmit = ()=>{
        if (!mood){setMood(0)}
        navigate(`/playlists/${user.userId}/${mood}`) 
    } 

    function moodChoice (e) {
        setMood(e.target.value)
    }

    return(
        <div id="mood-page">
            <p id="feeling-state">How are you feeling today?</p>
            <select id="feeling-dropdown" name="How are you feeling today?" defaultValue={0} onChange={moodChoice}>
                <option value={"neutral"}>Neutral</option>
                <option value={"happy"}>Happy</option>
                <option value={"sad"}>Sad</option>
            </select>
            <button id="mood-button" onClick={()=>handleSubmit()}>Submit</button>
        </div>
    )
}

export default Mood