import React from 'react'
import { useLocation } from 'react-router-dom'
import Info from '../Info'
import './css/ChatHeader.css'

function HeaderChat() {
    const location = useLocation()
    const { roomName } = location.state || {}

    return (
        <div className="header-chat">
            <button type="button" id="btn-close">
                <i className="fa-solid fa-arrow-left"></i>
            </button>

            <Info roomName={roomName} moreAvatar={true} />

            <button type="button" id="btn-add">
                <i className="fa-solid fa-user-plus"></i>
            </button>
        </div>
    )
}

export default HeaderChat