import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

function Mood () {
    const navigate = useNavigate()
    const user = useParams();
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
            <p>How are you feeling today?</p>
            <select name="How are you feeling today?" defaultValue={0} onChange={moodChoice}>
                <option value={"neutral"}>Neutral</option>
                <option value={"happy"}>Happy</option>
                <option value={"sad"}>Sad</option>
            </select>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
    )
}

export default Mood