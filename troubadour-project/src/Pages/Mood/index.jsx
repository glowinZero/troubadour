import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import BlobAnimation from "../../Components/Background";
import axios from "axios";

const API_URL = "https://trobadour.adaptable.app"
function Mood () {
    const navigate = useNavigate()
    const [mood, setMood] = useState();
    const {userId} = useParams();
    const handleSubmit = async () =>{

        if (!mood){setMood(0)}
        navigate(`/playlists/${userId}/${mood}`) 
    } 

    function moodChoice (e) {
        setMood(e.target.value)
    }

    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")

    const handleSubmitForm = (e) => {
        console.log("submit form clicked")
        e.preventDefault();
        axios.post(`${API_URL}/api/playlists/chatgpt`, { prompt })
            .then(res => {
                setResponse(res.data);
                navigate(`/playlists/${user.userId}/${response}`);
            })
            .catch(error => {
                console.log(error);
            });
    };
    

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

                // this is the prompt for the GPT-3 API//
                <form className="form" onSubmit={handleSubmitForm}> 
                    <input type="text" 
                    placeholder="type here" 
                    value={prompt}
                    onChange={handlePrompt}>
                    </input>
                </form>
                <button id="form-button" onClick={(e)=>handleSubmitForm(e)}>submit</button>
            </div>  
            <BlobAnimation />
        </div> 
    )
}

export default Mood