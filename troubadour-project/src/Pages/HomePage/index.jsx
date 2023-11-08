import { useNavigate } from "react-router-dom"

function HomePage(){
    const navigate = useNavigate()
    const handleSubmit = ()=>{
        navigate("/playlists") 
    } 
    return (
        <div>
            <h1>Troubadour</h1>
            <p>How are you feeling today?</p>
            <select name="How are you feeling today?">
                <option value={0}>Neutral</option>
                <option value={1}>Happy</option>
                <option value={2}>Sad</option>
            </select>
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
    )
}

export default HomePage