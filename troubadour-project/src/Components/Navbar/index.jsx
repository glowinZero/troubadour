import { useNavigate, Link, useLocation } from "react-router-dom"
import Popup from 'reactjs-popup';
import '../../App.css'
import axios from "axios"
import { useEffect, useState } from "react"
import logo from "../../../public/noun-banjo-5393194 (1).png"
const userApi = "http://localhost:5178"


function Navbar () {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState();
    const [inputUsername, setInputUsername] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [formType, setFormType] = useState("login");
    const [loggedin, setLoggedin] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!users.length) {
            axios.get(`${userApi}/users`)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        const storedUsername = localStorage.getItem("username");
        
        if (!loggedin && storedUsername !== null) {
            setUsername(storedUsername);
            const userFound = users.some(user => user.username === storedUsername);
            setLoggedin(userFound);
        }
        if (!loggedin) {
            updateUsernameFromStorage();
            if (location.pathname === "/" && performance.navigation.type !== 1) {
                navigate("/");
            }
        }
    }, [loggedin, location.pathname, navigate, users]);

    const updateUsernameFromStorage = () => {
        const storedUsername = window.localStorage.getItem("username");
        if (storedUsername && !username) {
            setUsername(storedUsername);
        }
    };
    const handleSubmit = (e, close) =>{
        e.preventDefault()
        if (!inputUsername && !password) {
            if (loggedin) {
                setLoggedin(false, () => {
                    setUsername("");
                    setPassword("");
                    setId(null);
                    navigate("/");
                    window.location.reload();
                    localStorage.removeItem("username");
                    close();
                  });
              }
          }
        localStorage.setItem("username", inputUsername);
        const requestBody = {inputUsername, password};
        formType === "signup" ? axios.post(`${userApi}/users`, requestBody).then(()=>{
            setLoggedin(true)
            close();
            window.location.reload();
        }).catch(error=>{console.log(error)}) : axios.get(`${userApi}/users`).then((response)=>{
            setUsers(response.data)
            const userID = users.filter((user)=>{return (user.username === inputUsername)})
            setId(userID[0].id);
            if (users.some(user => user.username === inputUsername && user.password === password )) {
                setLoggedin(true)
                close();
                navigate(`/mood/${userID[0].id}`)
            } else {
                setInputUsername("");
                setPassword("")
                alert("User or password is incorrect or missing");
            }}).catch(error=>{console.log(error)})
    }
    const toggleForm = () =>{
        setFormType(formType === "login" ? "signup" : "login");
    }
    const logOut = () => {
        setLoggedin(false);
        setId(null);
        localStorage.removeItem("username");
        navigate("/");
        setInputUsername("");
        setPassword("");
    };
    const openPopup = () => {
        setPopupOpen(true);
    };
    const closePopup = () => {
        setPopupOpen(false);
    };
    const editUser = () =>{
        console.log("Navigating to edit page with id:", id);
        navigate(`/edit/${id}`)
        setPopupOpen(false);
        closePopup();
    }
    return (
        <nav id="navbar">
            <img id="logo-bar" src={logo}/>
            {loggedin && <div id="menu">
                <Link id="link-menu" to="/playlists/:userId/:mood"> Playlists</Link>
            </div>}
            {location.pathname === "/" ? 
                        <Popup id="popup" 
                        modal
                        nested
                        open={popupOpen}
                        onClose={closePopup}>
                        {(close) => (
                            <form className="overlay" onSubmit={(e)=>handleSubmit(e, close)}>
                            {!loggedin || !username === "" ?(
                                <div id="form">
                                    <button id="close-popup" onClick={() => close()}>x</button>
                                    <h4>{formType === "login" ? "login" : "signup"}</h4>
                                    <label><input id="username" type="text" placeholder="username" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)}/></label>
                                    <label><input id="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
                                    <button id="home-signup" type="submit">{formType === "login" ? "login" : "signup"}</button>
                                    <button id="home-toggle" type="button" onClick={toggleForm} > {formType === "signup" ? "Already have an account!" : "Don't have an account!"}</button>
                                </div>) : (
                                    <div id="form">
                                        <button id="close-popup" onClick={() => close()}>x</button>
                                        {!username || !password ? setUsername(window.localStorage.getItem("username")) : console.log("User info provided")}
                                        <p>Hi {username} !</p>
                                        <button id="home-signup" type="button" onClick={()=>{logOut()}}>Logout</button>
                                        <button id="home-toggle" type="button" onClick={()=>{editUser()}}>Edit account</button>
                                    </div>
                                    )}
                            </form>
                            )}
                        </Popup>
                        :<Popup trigger={<button id="popup" onClick={openPopup}>{!username && !loggedin ? <p>login</p> : <p>{username}</p>}</button>}
                        modal
                        nested
                        open={popupOpen}
                        onClose={closePopup}>
                        {(close) => (
                            <form className="overlay" onSubmit={(e)=>handleSubmit(e, close)}>
                            {!loggedin || !username === "" ?(
                                <div id="form">
                                    <button id="close-popup" onClick={() => close()}>x</button>
                                    <h4>{formType === "login" ? "login" : "signup"}</h4>
                                    <label><input id="username" type="text" placeholder="username" value={inputUsername} onChange={(e) => setInputUsername(e.target.value)}/></label>
                                    <label><input id="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
                                    <button id="home-signup" type="submit">{formType === "login" ? "login" : "signup"}</button>
                                    <button id="home-toggle" type="button" onClick={toggleForm} > {formType === "signup" ? "Already have an account!" : "Don't have an account!"}</button>
                                </div>) : (
                                    <div id="form">
                                        <button id="close-popup" onClick={() => close()}>x</button>
                                        {!username || !password ? setUsername(window.localStorage.getItem("username")) : console.log("User info provided")}
                                        <p>Hi {username} !</p>
                                        <button id="home-signup" type="button" onClick={()=>{logOut()}}>Logout</button>
                                        <button id="home-toggle" type="button" onClick={()=>{editUser()}}>Edit account</button>
                                    </div>
                                    )}
                            </form>
                            )}
                        </Popup>
                                    }
        </nav>
    )
}
export default Navbar