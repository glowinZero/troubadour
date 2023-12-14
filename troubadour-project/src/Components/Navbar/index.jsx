import { useNavigate, useLocation } from "react-router-dom"
import Popup from 'reactjs-popup';
import '../../App.css'
import axios from "axios"
import { useEffect, useState } from "react"
import logo from "../../../public/noun-banjo-5393194 (1).png"
const userApi = "https://troubadour-backend.onrender.com"

function Navbar () {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState(null);
    const [inputUsername, setInputUsername] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [formType, setFormType] = useState("login");
    const [loggedin, setLoggedin] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [newUserId, setNewUserId] = useState();
    

    useEffect(() => {
        if (newUserId) {
          localStorage.setItem("newUserId", newUserId);
        }
    }, [newUserId]);

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
        e.preventDefault();

        if (!inputUsername || !password) {
            alert("User or password is incorrect or missing");

            if (loggedin) {
                setLoggedin(false)
                setUsername("");
                setPassword("");
                setInputUsername("");
                localStorage.removeItem("username");
                navigate("/");
                window.location.reload();
                close();
            }
            return;
        }

        localStorage.setItem("username", inputUsername);
        localStorage.setItem("userId", id);
        const requestBody = {username: inputUsername, password: password, name: name, email: email};

        (formType === "signup"
        ? axios.post(`${userApi}/users`, requestBody)
        .then(() => {
            setLoggedin(true);
            setInputUsername("");
            setUsername("");
            setPassword("");
            setName("");
            setEmail("");
            localStorage.removeItem("username");
            window.location.reload();
            close();
        }).catch(error => {
            console.log(error);
        })
        : axios.get(`${userApi}/users`)
        .then(response => {
            setUsers(response.data);
            const userID = users.filter(user => user.username === inputUsername);
        
            if (userID.length > 0 && users.some(user => user.username === inputUsername && user.password === password)) {
                setLoggedin(true);
                close();
                localStorage.setItem("userId", userID[0].id);
                navigate(`/mood/${userID[0].id}`);
            } else {
                localStorage.removeItem("userId");
                localStorage.removeItem("username");
                alert("User or password is incorrect or missing");
                setInputUsername("");
                setPassword("");
            }
        }).catch(error => {console.log(error)}));
    };

    const toggleForm = () =>{
        setFormType(formType === "login" ? "signup" : "login");
    };

    const logOut = () => {
        setLoggedin(false);
        setId(null);
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        localStorage.removeItem("newUserId");
        navigate("/");
        setInputUsername("");
        setPassword("");
        window.location.reload();
    };

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const editUser = () =>{
        const storedUserId = localStorage.getItem("userId");
        if (!id) {
            setNewUserId(storedUserId);
            navigate(`/edit/${storedUserId}`);
        } else {
            setNewUserId(null);
            navigate(`/edit/${id}`);
        }

        setPopupOpen(false);
        closePopup();
    };

    const createPlaylist = () =>{
        const storedUserId = localStorage.getItem("userId");
        if (!id) {
            setNewUserId(storedUserId);
            navigate(`/mood/${storedUserId}`);
        } else {
            setNewUserId(null);
            navigate(`/mood/${id}`);
        }

        setPopupOpen(false);
        closePopup();
    };



    return (
        <nav id="navbar">
            <img id="logo-bar" src={logo}/>
            {loggedin && <div id="menu">
                <button id="link-mood" onClick={()=>{createPlaylist()}}>Create Playlist</button>
                <button id="link-history" onClick={()=>navigate(`/history/${id}`)}>History</button>
            </div>} 
            <Popup trigger={<button id="popup" onClick={openPopup}>{!username || !loggedin ? <p>Get Started</p> : <p>{username}</p>}</button>}
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
                                {formType === "signup" ? <input id="name" type="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/> : console.log("login form")}
                                {formType === "signup" ? <input id="email" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/> : console.log("login form")}
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
        </nav>
    )
}
export default Navbar