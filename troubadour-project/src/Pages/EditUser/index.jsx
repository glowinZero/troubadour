import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
const userApi = "https://troubadour-backend.onrender.com"

function EditUser (){
    const user = useParams();
    const [loggedUser, setloggedUser] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${userApi}/users/${user.userId}`).then((response)=>{
            setloggedUser(response.data)
        }).catch(error=>{console.log(error) })
    }, [])

    const handleUpdate = (e)=>{
        e.preventDefault();
        const updateInfo = {
            name: !name ? loggedUser.name : name,
            email: !email ? loggedUser.email : email,
            username: !username ? loggedUser.username : username,
            password: !password ? loggedUser.password : password,
        };

        axios.put(`${userApi}/users/${user.userId}`, updateInfo).then((response) => {
            setloggedUser(response.data);
            setName("");
            setEmail("");
            setUsername("");
            setPassword("");
            alert("User information updated");
        }).catch((error) => {
            console.log(error);
        });
    } 

    const deleteUser = () => {
        axios.delete(`${userApi}/users/${user.userId}`).then(() => {
            localStorage.removeItem("username")
            navigate("/")
            window.location.reload()
        }).catch((error) => {
            console.log(error);
        });
    };
      
    return(
        <div id="edit-user">
            <form id="form-edit-user" onSubmit={handleUpdate}>
                <label>Name <input id="name" type="text" placeholder={loggedUser.name} value={name} onChange={e=>{setName(e.target.value)}}/></label>
                <label>Email <input type="email" placeholder={loggedUser.email} value={email} onChange={e=>{setEmail(e.target.value)}}/></label>
                <label>Username <input type="text" placeholder={loggedUser.username} value={username} onChange={e=>{setUsername(e.target.value)}}/></label>
                <label>Password <input type="password" placeholder="********" value={password} onChange={e=>{setPassword(e.target.value)}}/></label>
                <div id="buttons-edit-user">
                    <label><button id="save-user" type="submit" >Save changes</button></label>
                    <label><button id="delete-user" onClick={deleteUser}>Delete user</button></label>
                </div>
            </form>
        </div>
    )
}

export default EditUser