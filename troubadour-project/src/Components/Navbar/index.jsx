import { useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup';
import '../../App.css'
import axios from "axios"
import { useEffect, useState } from "react"
import logo from "../../../public/noun-banjo-5393194 (1).png"

const userApi = "http://localhost:5174/"

function Navbar () {
    const [users, setUsers] = useState([])
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [formType, setFormType] = useState("login");
    const [loggedin, setLoggedin] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`${userApi}/users`).then((response)=>{
            setUsers(response.data)
        })
    }, [])
    
    const handleSubmit = (e, close) =>{
        e.preventDefault();
        if (!username || !password){ alert("Username and password are required.")}
        else{
        const requestBody = {username, password};
            formType === "signup" ? axios.post(`${userApi}/users`, requestBody).then(()=>{
                    setLoggedin(true)
                    close();
                    navigate("/playlists") 
                })
                .catch(error=>{console.log(error)}) : axios.get(`${userApi}/users`).then((response)=>{
                setUsers(response.data)
                if (users.some(user => user.username === username && user.password === password )) {
                    setLoggedin(true)
                    close();
                    navigate("/playlists");
                } else {
                    setUsername("")
                    setPassword("")
                    alert("User or password is incorrect or missing");
                }
            }).catch(error=>{console.log(error)})
        }
    }

    const toggleForm = () =>{
        setFormType(formType === "login" ? "signup" : "login");
    }


    const logOut = ()=>{
        setLoggedin(false)
        setUsername("")
        setPassword("")
        navigate("/")
        window.location.reload();
    }

    const openPopup = () => {
        setPopupOpen(true);
      };
    
      const closePopup = () => {
        setPopupOpen(false);
      };
    

    return (
        <nav id="navbar">
            <img id="logo-bar" src={logo}/>
            <Popup trigger={<button id="popup" onClick={openPopup}>{loggedin? <p>{username}</p> : "Login"}</button>} 
            modal 
            nested
            open={popupOpen}
            onClose={closePopup}>
            {(close) => (
                <form className="overlay" onSubmit={(e)=>handleSubmit(e, close)}>
                {!loggedin ? (
                    <div id="form">
                        <button onClick={() => close()}>x</button>
                        <h4>{formType === "login" ? "Login" : "Signup"}</h4>
                        <label><input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/></label>
                        <label><input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </label><button type="submit">{formType === "login" ? "Login" : "Signup"}</button>
                        <button id="home-signup" type="button" onClick={toggleForm} > {formType === "signup" ? "Already have an account! Login" : "Don't have an account! Signup"}</button>
                    </div>) : (
                        <div id="form">
                            <p>{username}</p>
                            <p>{password}</p>
                            <button type="button" onClick={()=>{logOut()}}>Logout</button>
                        </div>
                        )}
                </form> 
                )}
            </Popup>

        </nav>
    )
}

export default Navbar