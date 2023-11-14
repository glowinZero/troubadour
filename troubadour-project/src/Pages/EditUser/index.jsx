import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
const userApi = "http://localhost:5178"

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
            console.log(loggedUser)
        }).catch(error=>{console.log(error)})
    }, [])

    const handleUpdate = ()=>{
        const updateInfo = {
            name: !name ? loggedUser.name : name,
            email: !email ? loggedUser.email : email,
            username: !username ? loggedUser.username : username,
            password: !password ? loggedUser.password : password,
        };
        axios.put(`${userApi}/users/${user.userId}`, updateInfo)
    }

    const deleteUser = () =>{
        axios.delete(`${userApi}/users/${user.userId}`)
        navigate("/")
    }
    
    return(
        <div id="edit-user">
            <form id="form-edit-user"onSubmit={e=>{handleUpdate(e)}}>
                <label>Name <input id="name" type="text" placeholder={loggedUser.name} value={name} onChange={e=>{setName(e.target.value)}}/></label>
                <label>Email <input type="email" placeholder={loggedUser.email} value={email} onChange={e=>{setEmail(e.target.value)}}/></label>
                <label>Username <input type="text" placeholder={loggedUser.username} value={username} onChange={e=>{setUsername(e.target.value)}}/></label>
                <label>Password <input type="password" placeholder="********" value={password} onChange={e=>{setPassword(e.target.value)}}/></label>
                <div id="buttons-edit-user">
                    <label><button type="submit">Save changes</button></label>
                    <label><button type="submit" onClick={deleteUser}>Delete user</button></label>
                </div>
            </form>
        </div>
    )
}

export default EditUser