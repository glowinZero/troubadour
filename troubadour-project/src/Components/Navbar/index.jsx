import { Link } from "react-router-dom"
import '../../App.css'

function Navbar () {
    return (
        <nav id="navbar">
            <Link to="/playlists">Playlist</Link>
        </nav>
    )
}

export default Navbar