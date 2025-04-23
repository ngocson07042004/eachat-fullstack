import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Info from '../Info'
import './css/ChatHeader.css'

function HeaderChat(){
    const navigate = useNavigate()
    const location = useLocation()
    const { roomName, avatar } = location.state || {}

    return(
        <div className="header-chat">
            <button type="button" id="btn-close" onClick={() => navigate("/chat")}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>

            <Info roomName={roomName} image={avatar} onlineUser={roomName}/>

            <button type="button" id="btn-search">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    )
}

export default HeaderChat