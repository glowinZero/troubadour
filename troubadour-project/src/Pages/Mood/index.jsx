import { useNavigate, useParams } from "react-router-dom"
import '../../App.css'
import { useState } from "react";

function Mood () {
    const navigate = useNavigate()
    const user = useParams();
    const [mood, setMood] = useState();
    const handleSubmit = ()=>{
        console.log
        if (mood === undefined){setMood(0)}
        navigate(`/playlists/${user.userId}/${mood}`) 
    } 

    function moodCHoice (e) {
        setMood(e.target.value)
    }

    return(
        <div id="mood-page">
            <p>How are you feeling today?</p>
            <select name="How are you feeling today?" defaultValue={0} onChange={moodCHoice}>
                <option value={0}>Neutral</option>
                <option value={1}>Happy</option>
                <option value={2}>Sad</option>
            </select>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
    )
}

export default Mood