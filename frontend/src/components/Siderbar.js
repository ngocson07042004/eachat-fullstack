import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios'
import { setLogin } from '../pages/Login'
import './css/sidebar.css'

function Sidebar(){
    const [active, setActive] = useState("chat")
    const [user, setUser] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8081/chat')
        .then(res => setUser(res.data.find(item => item.Username === setLogin.user)))
        .catch(err => console.log(err))
    }, [])

    return(
        <div className="container-sidebar">
            <div className="sidebar">
                <ul>
                    <li 
                        id={active === "chat" ? "active" : ""}
                        onClick={() =>setActive("chat")}
                    ><NavLink to="/chat"><i className="fa-solid fa-comment"></i></NavLink></li>

                    <li
                        id={active === "friend" ? "active" : ""}
                        onClick={() =>setActive("friend")}
                    ><NavLink to="/friend"><i className="fa-solid fa-user"></i></NavLink></li>

                    <li
                        id={active === "fa-solid fa-box-archive" ? "active" : ""}
                        onClick={() =>setActive("fa-solid fa-box-archive")}
                    ><NavLink to="/archived"><i className="fa-solid fa-box-archive"></i></NavLink></li>
                </ul>

                <div className="user-info-img">
                    <Link to="/user"><img src={user.Avatar} alt={user.LastName + " " + user.Name} /></Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar