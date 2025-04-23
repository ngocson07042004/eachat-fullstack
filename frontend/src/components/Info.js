import React from 'react'
import './css/Info.css'

function Info({ roomName, image, content, timer }){
    return (
        <div className="info">
            <div className="img-info">
                <img src={`http://localhost:8081/users/${image}`} alt="Avatar" />
            </div>

            <div className="info-title">
                <h4>{roomName}</h4>
                <div className="content-info">
                    <span className="content">{content}</span>
                    <span className="timer">{timer}</span>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Info)