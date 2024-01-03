import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import BlobAnimation from "../../Components/Background";
import axios from "axios";

const API_URL = "http://localhost:5005"

function Mood () {
    const navigate = useNavigate()
    const user = useParams();
    const [mood, setMood] = useState();

    const handleSubmit = ()=>{
        if (!mood){setMood(0)}
        navigate(`/playlists/${user.userId}/${mood}`) 
    } 
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")

    function moodChoice (e) {
        setMood(e.target.value)
    }

    const handleSubmitForm = (e) =>{
        e.preventDefault()
        axios.post(`${API_URL}`, {prompt})
        .then(res=>setResponse(res.data))
        .catch(error=>{console.log(error)})
    }

    const handlePrompt = (e) => {
        setPrompt(e.target.value)
    }
    
    return(
        <div id="mood-page">
            <div id="mood-page-info">
                <p id="feeling-state">I am feeling 
                    <select id="feeling-dropdown" name="How are you feeling today?" defaultValue={0} onChange={moodChoice}>
                        <option value={"neutral"}>Neutral</option>
                        <option value={"happy"}>Happy</option>
                        <option value={"sad"}>Sad</option>
                        <option value={"romantic"}>Romantic</option>
                        <option value={"calm"}>calm</option>
                        <option value={"angry"}>Angry</option>
                        <option value={"hopeful"}>Hopeful</option>
                    </select> 
                today</p>
                <button id="mood-button" onClick={()=>handleSubmit()}>submit</button>
                <form className="form" onSubmit={handleSubmitForm}>
                    <input type="text" 
                    placeholder="type here" 
                    value={prompt}
                    onChange={handlePrompt}>
                    </input>
                </form>
            </div>
            <BlobAnimation />
        </div>
    )
}

export default Mood