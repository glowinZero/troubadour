import { useNavigate } from "react-router-dom"
import Popup from 'reactjs-popup';
import '../../App.css'
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import logo from "../../assets/noun-banjo-5393194 (1).png"
import { AuthContext } from "../../Context/auth.context";

const userApi = "http://localhost:5005"

function Navbar() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [formType, setFormType] = useState("login");
    const [popupOpen, setPopupOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logOut } = useContext(AuthContext);
    const [error, setError] = useState();
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const [loggedUser, setLoggedUser] = useState();
    const [loggedin, setLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
        return; 
      }
  
      setLoggedUser(user);
  
      const fetchData = async () => {
        const getToken = localStorage.getItem("authToken");
  
        if (getToken && user) {
          try {
            const idUser = user._id;
  
            const responseUser = await axios.get(
              `${userApi}/auth/users/${idUser}`
            );
            setLoggedUser(responseUser.data);
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        }
      };
  
      fetchData();
    }, [user, navigate]);
  
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
  
      const requestBody = { email, password };
  
      try {
        const response = await axios.post(`${userApi}/auth/login`, requestBody);
        const { authToken, userId } = response.data;
  
        storeToken(authToken);
  
        const userResponse = await axios.get(`${userApi}/auth/users/${userId}`);
        const loggedInUser = userResponse.data;
  
        authenticateUser(loggedInUser);
  
        setLoggedIn(true);
        navigate("/mood");
      } catch (error) {
        const errorDescription = error.response?.data?.message || "Login failed.";
        setError(errorDescription);
      }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const requestBody = { email, password, username};
    
        if (
          email === "" ||
          password === "" ||
          username === ""
        ) {
          alert("Provide all fields in order to create a new Student");
          return;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
          alert("Provide a valid email");
          return;
        }
    
        const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!passwordRegex.test(password)) {
          alert("Password must have at least 6 characters and contain 1 lowercase letter, 1 uppercase letter, 1 number");
          return;
        }
    
        axios
          .post(`${userApi}/auth/signup`, requestBody)
          .then(() => {
            return axios.post(`${userApi}/auth/login`, requestBody);
          })
          .then((response) => {
            storeToken(response.data.authToken);
            localStorage.setItem("Logged In", response.data.authToken);
            authenticateUser();
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorDescription =
              error.response.data.message ||
              "Failed to create a Student. Please try again.";
            setError(errorDescription);
          });
    };

    const toggleForm = () =>{
        setFormType(formType === "login" ? "signup" : "login");
    };

    const logout = () => {
        logOut();
        setLoggedUser(null);
        setLoggedIn(false);
        localStorage.removeItem("Logged In");
        setEmail("");
        setPassword("");
        navigate("/");
      };

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const editUser = () =>{
        const storedUserId = loggedUser._id;
        navigate(`/edit/${storedUserId}`);
        setPopupOpen(false);
        closePopup();
    };

    const createPlaylist = () =>{
        navigate(`/mood`);
        setPopupOpen(false);
        closePopup();
    };

    const historyPage = () =>{
        navigate(`/history/`);
        setPopupOpen(false);
        closePopup();
    };



    return (
        <nav id="navbar">
            <img id="logo-bar" src={logo}/>
            {loggedin && <div id="menu">
                <button id="link-mood" onClick={()=>{createPlaylist()}}>Create Playlist</button>
                <button id="link-mood" onClick={()=>{historyPage()}}>History</button>
            </div>} 
            <Popup trigger={<button id="popup" onClick={openPopup}>{!loggedin ? <p>Get Started</p> : <p>{loggedUser?.username}</p>}</button>}
            modal
            nested
            open={popupOpen}
            onClose={closePopup}>
                {(close) => (
                    <form className="overlay" onSubmit={formType === "login" ? (e)=>handleLoginSubmit(e, close) : (e)=>handleRegister(e, close)}>
                        {!loggedin || !loggedUser?.username === "" ?(
                            <div id="form">
                                <button id="close-popup" onClick={() => close()}>x</button>
                                <h4>{formType === "login" ? "login" : "signup"}</h4>
                                <label><input id="email" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/></label>
                                {formType === "signup" ? <input id="username" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/> : ""}
                                <label><input id="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
                                <button id="home-signup" type="submit">{formType === "login" ? "login" : "signup"}</button>
                                <button id="home-toggle" type="button" onClick={toggleForm} > {formType === "signup" ? "Already have an account!" : "Don't have an account!"}</button>
                            </div>) : (
                            <div id="form">
                                <button id="close-popup" onClick={() => close()}>x</button>
                                {!username || !password ? setUsername(window.localStorage.getItem("username")) : console.log("User info provided")}
                                <p>Hi {loggedUser?.username} !</p>
                                <button id="home-signup" type="button" onClick={()=>{logout()}}>Logout</button>
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